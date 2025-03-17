import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { IMessage } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageCollection = 'messages';

  constructor(private firestore: Firestore) {}

  async createMessage(message: IMessage): Promise<void> {
    try {
      const messagesCollection = collection(
        this.firestore,
        this.messageCollection
      );
      await addDoc(messagesCollection, message);
      console.log(' Message saved successfully:', message);
    } catch (error) {
      console.error(' Firestore Error (createMessage):', error);
      throw error;
    }
  }

  getMessages(): Observable<IMessage[]> {
    const messagesCollection = collection(
      this.firestore,
      this.messageCollection
    );

    // Query to order by `createdAt` in descending order (newest first)
    const messagesQuery = query(
      messagesCollection,
      orderBy('createdAt', 'desc')
    );

    return collectionData(messagesQuery, { idField: 'id' }) as Observable<
      IMessage[]
    >;
  }
}
