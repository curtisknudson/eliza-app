import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { ElizaConnectAdapterInterface } from "./types";

import { ElizaService } from "../gen/eliza/v1/eliza_connectweb";

export class ElizaConnectAdapter implements ElizaConnectAdapterInterface {
  transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
  });

  client = createPromiseClient(ElizaService, this.transport);

  async talkToEliza(sentence: string) {
    return await this.client.talk({
      sentence,
    });
  }
}
