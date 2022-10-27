import { ElizaConnectAdapterInterface } from "../adapters/types";
import { ElizaMediatorInterface } from "./types";

export class ElizaMediator implements ElizaMediatorInterface {
  private adapter: ElizaConnectAdapterInterface;

  constructor(adapter: ElizaConnectAdapterInterface) {
    this.adapter = adapter;
  }

  async talkToEliza(sentence: string) {
    if (!sentence) {
      throw new Error("You must provide a sentence");
    }

    return await this.adapter.talkToEliza(sentence);
  }
}
