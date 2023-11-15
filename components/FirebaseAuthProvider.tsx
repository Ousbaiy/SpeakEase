'use client';

import { auth } from '@/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

async function syncfirebaseAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (e) {
      console.error('Error signing in with custom token', e);
    }
  } else {
    auth.signOut();
  }
}
const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    syncfirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;
