import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesFailure,
  addMessage,
  addMessageSuccess,
  addMessageFailure,
} from '../actions/message.action';
import { initialMessageState } from '../states/message.state';

export const messagesReducer = createReducer(
  initialMessageState,

  // Load Messages
  on(loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false,
    error: null,
  })),
  on(loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Message
  on(addMessage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(addMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    loading: false,
    error: null,
  })),
  on(addMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const messageFeature = createFeature({
  name: 'messageFeature',
  reducer: messagesReducer,
});
