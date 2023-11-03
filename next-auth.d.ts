import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    firebaseToken?: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
