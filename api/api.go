package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
)

func main() {
	var TreeAPI = os.Args[1]

	r := chi.NewRouter()

	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// When a client closes their connection midway through a request, the
	// http.CloseNotifier will cancel the request context (ctx).
	r.Use(middleware.CloseNotify)

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))

	type Result struct {
		Success bool   `json:"success"`
		Message string `json:"message"`
	}

	r.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("pong"))
	})

	r.Get("/change", func(w http.ResponseWriter, r *http.Request) {
		// if only one expected
		c := r.URL.Query().Get("to")
		if c != "" {
			fmt.Printf("Request is: %v\n", c)
			req, _ := http.NewRequest("GET", TreeAPI, nil)
			q := req.URL.Query()
			q.Add("from", "website")
			q.Add("tweet", c)
			req.URL.RawQuery = q.Encode()

			var netClient = &http.Client{
				Timeout: time.Second * 10,
			}
			response, err := netClient.Do(req)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				var result = Result{Success: false, Message: "can't connect to the tree right now :< please try again in a little while"}
				render.JSON(w, r, result)
			} else {
				defer response.Body.Close()
				var result = Result{Success: true, Message: "all good in the hood"}
				render.JSON(w, r, result)
			}
		} else {
			w.WriteHeader(http.StatusBadRequest)
			var result = Result{Success: false, Message: "missing to parameter"}
			render.JSON(w, r, result)
		}
	})

	http.ListenAndServe(":8080", r)
	fmt.Printf("Full steam ahead\n")

}
