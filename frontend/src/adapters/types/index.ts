import { TalkResponse } from "../../gen/eliza/v1/eliza_pb";

export interface ElizaConnectAdapterInterface {
  talkToEliza(sentence: string): Promise<TalkResponse>;
}
