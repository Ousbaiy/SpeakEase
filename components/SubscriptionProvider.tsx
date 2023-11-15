'use client';

import { subscriptionRef } from '@/lib/converters/Subscription';
import { useSubscriptionStore } from '@/store/store';
import { onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const setSubscrption = useSubscriptionStore((state) => state.setSubscription);

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          setSubscrption(null);
        } else {
          setSubscrption(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log('Error getting documet', error);
      }
    );
  }, [session, setSubscrption]);
  return <div>{children}</div>;
};

export default SubscriptionProvider;
