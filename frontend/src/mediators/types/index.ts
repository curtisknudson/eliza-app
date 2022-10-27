import { TalkResponse } from "../../gen/eliza/v1/eliza_pb";

export interface ElizaMediatorInterface {
  talkToEliza(sentence: string): Promise<TalkResponse>;
}
