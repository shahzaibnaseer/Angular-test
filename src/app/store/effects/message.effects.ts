import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, map, from, of, tap } from 'rxjs';
import {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesFailure,
  addMessage,
  addMessageSuccess,
  addMessageFailure,
} from '../actions/message.action';
import { MessageService } from '../../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  private messageService = inject(MessageService);
  private snackBar = inject(MatSnackBar);
  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      switchMap(() =>
        this.messageService.getMessages().pipe(
          map((messages) => loadMessagesSuccess({ messages })),
          catchError((error) =>
            of(loadMessagesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMessage),
      switchMap(({ message }) =>
        from(this.messageService.createMessage(message)).pipe(
          map(() => addMessageSuccess({ message })),
          catchError((error) => of(addMessageFailure({ error: error.message })))
        )
      )
    )
  );
  addMessageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addMessageSuccess),
        tap(() => {
          this.snackBar.open('Message added successfully!', 'Close', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
