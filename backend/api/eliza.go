package api

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/bufbuild/connect-go"
	elizav1 "gitlab.com/daknudson/eliza/backend/gen/proto/go/v1"
)

type ElizaServer struct{}

type ElizaApiResponse struct {
	Reply string `json:"reply"`
}

func (s *ElizaServer) Talk(
	ctx context.Context,
	req *connect.Request[elizav1.TalkRequest],
) (*connect.Response[elizav1.TalkResponse], error) {

	baseUrl := "https://eliza-assemblage-api.herokuapp.com/"

	resp, err := http.Get(baseUrl + req.Msg.Sentence)

	if err != nil {
		log.Fatalln(err)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		log.Fatalln(err)
	}

	mySimpleMap := make(map[string]map[string]string)

	json.Unmarshal(body, &mySimpleMap)

	var reply = mySimpleMap["response"]["reply"]

	res := connect.NewResponse(&elizav1.TalkResponse{
		Sentence: reply,
	})

	return res, nil
}
