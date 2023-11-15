'use client';

import { db } from '@/firebase';
import { useSubscriptionStore } from '@/store/store';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ManageAccountButton from './ManageAccountButton';

const CheckoutButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;
  const isSubscribed =
    subscription?.status === 'active' && subscription?.role === 'pro';

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;
    setLoading(true);

  const docRef = await addDoc(
      collection(db, 'customers', session.user.id, 'checkout_sessions'),
      {
        price: 'price_1O8SOSGOan45x41fXwOVGmAW',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are subscribed to PRO
          </p>
        </>
      )}

      <div className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex place-content-center">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <button onClick={() => createCheckoutSession()}>Sign Up</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;
