package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/sbstjn/hanu"
)

func change(api string, c string) bool {
	req, _ := http.NewRequest("GET", api, nil)
	q := req.URL.Query()
	q.Add("to", c)
	req.URL.RawQuery = q.Encode()

	var netClient = &http.Client{
		Timeout: time.Second * 5,
	}
	response, err := netClient.Do(req)
	if err != nil {
		return false
	}
	defer response.Body.Close()
	return true
}

func main() {
	var api = "http://api.port57tree.com/change"
	slack, err := hanu.New(os.Args[1])

	if err != nil {
		log.Fatal(err)
	}

	Version := "1.0.0"

	slack.Command("<colour>", func(conv hanu.ConversationInterface) {
		str, _ := conv.String("colour")
		var res = change(api, str)
		if !res {
			conv.Reply("I'm disconnected :<")
		}
	})

	slack.Command("<colour1> and <colour2>", func(conv hanu.ConversationInterface) {
		str1, _ := conv.String("colour1")
		str2, _ := conv.String("colour2")
		var res = change(api, fmt.Sprintf("%v,%v", str1, str2))
		if !res {
			conv.Reply("I'm disconnected :<")
		}
	})

	slack.Command("<colour1> <colour2>", func(conv hanu.ConversationInterface) {
		str1, _ := conv.String("colour1")
		str2, _ := conv.String("colour2")
		var res = change(api, fmt.Sprintf("%v,%v", str1, str2))
		if !res {
			conv.Reply("I'm disconnected :<")
		}
	})

	slack.Command("version", func(conv hanu.ConversationInterface) {
		conv.Reply("I'm running %s", Version)
	})

	slack.Listen()
}
