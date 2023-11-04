'use client';

import { db } from '@/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const CheckoutButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

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
    // if subscribed show it
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => createCheckoutSession()}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {loading ? 'Loading...' : ' Sign Up'}
      </button>
    </div>
  );
};

export default CheckoutButton;
