import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IMessage } from '../../models/message.model';
import { loadMessages } from '../../store/actions/message.action';
import { messageFeature } from '../../store/reducers/message.reducer';
import { AsyncPipe, DatePipe, SlicePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-messages',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    AsyncPipe,
    MatCardModule,
    MatTableModule,
    SlicePipe,
    DatePipe,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  standalone: true,
})
export class MessagesComponent {
  readonly dialog = inject(MatDialog);
  private store = inject(Store);
  displayedColumns: string[] = ['id', 'email', 'message', 'createdAt'];
  messages$: Observable<IMessage[]> = this.store.select(
    messageFeature.selectMessages
  );
  messages: IMessage[] = [];
  messagesLoading$: Observable<boolean> = this.store.select(
    messageFeature.selectLoading
  );
  ngOnInit() {
    this.messagesLoading$.subscribe((loading) => {
      console.log(loading);
    });
    this.store.dispatch(loadMessages());
    this.messages$.subscribe((res) => {
      this.messages = res;
    });
  }
  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      width: '500px',
      disableClose: true,
      panelClass: 'message-dialog',
    });
  }
}
