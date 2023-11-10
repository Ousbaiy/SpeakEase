import { db } from '@/firebase';
import { LanguagesSupported } from '@/store/store';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

export type User = {
  id: string;
  email: string;
  name: string;
  image: string;
};

export type Message = {
  id?: string;
  input: string;
  timestamp: Date;
  user: User;
  translated?: {
    [K in LanguagesSupported]?: string;
  };
};

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: (message: Message): DocumentData => {
    return {
      input: message.input,
      timestamp: message.timestamp,
      user: message.user,
      // other fields
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      input: data.input,
      timestamp: data.timestamp?.toDate(),
      translated: data.translated,
      user: data.user,
    };
  },
};

export const messagesRef = (chatId: string) =>
  collection(db, 'chats', chatId, 'messages').withConverter(messageConverter);

export const limitedMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), limit(25))

export const sortMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), orderBy('timestamp', 'asc'));

export const limitedSortedMessagesRef = (chatId: string) =>
  query(query(messagesRef(chatId), limit(1)), orderBy('timestamp', 'desc'));