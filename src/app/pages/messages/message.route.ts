import { Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MessagesEffects } from '../../store/effects/message.effects';
import { messageFeature } from '../../store/reducers/message.reducer';

export default [
  {
    path: '',
    component: MessagesComponent,
    providers: [provideState(messageFeature), provideEffects(MessagesEffects)],
  },
] as Routes;
