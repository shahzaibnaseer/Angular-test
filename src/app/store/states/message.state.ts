import { IMessage } from "../../models/message.model";

export interface MessagesState {
  messages: IMessage[];
  loading: boolean;
  error: string | null;
}

export const initialMessageState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};
