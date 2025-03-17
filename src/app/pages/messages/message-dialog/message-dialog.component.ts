import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMessage } from '../../../models/message.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { addMessage } from '../../../store/actions/message.action';
import { Observable } from 'rxjs';
import { messageFeature } from '../../../store/reducers/message.reducer';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-message-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    AsyncPipe,
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Fixed this
})
export class MessageDialogComponent {
  messageForm: FormGroup;
  messagesLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    private store: Store
  ) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
    this.messagesLoading$ = this.store.select(messageFeature.selectLoading);
  }

  async addMessage() {
    if (this.messageForm.valid) {
      const newMessage: IMessage = {
        email: this.messageForm.get('email')?.value,
        message: this.messageForm.get('message')?.value,
        createdAt: new Date().toISOString(),
      };
      this.store.dispatch(
        addMessage({
          message: newMessage,
        })
      );
      this.dialogRef.close();
    } else {
      this.messageForm.markAllAsTouched();
    }
  }
}
