package main

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"
	api "gitlab.com/daknudson/eliza/backend/api"
	"gitlab.com/daknudson/eliza/backend/gen/proto/go/v1/elizav1connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func newCORS() *cors.Cors {
	return cors.New(cors.Options{
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		AllowedHeaders: []string{"*"},
	})
}

func main() {
	sayer := &api.ElizaServer{}

	mux := http.NewServeMux()

	path, handler := elizav1connect.NewElizaServiceHandler(sayer)

	mux.Handle(path, handler)

	fmt.Print("==========\nrunning on localhost:8080\n==========\n")

	http.ListenAndServe(
		"localhost:8080",
		// Makes so that we can serve http2 without a TLS handshake
		h2c.NewHandler(newCORS().Handler(mux), &http2.Server{}),
	)
}
