'use client'

import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CheckoutButton = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const createCheckoutSession = async () => {
    if (!session?.user.id) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {
      price: "price_1L9O4mEg1dJH9Q4Vn7Yg1s",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })

    // 2H.32
    // stripe checkout
  }


  return (
    // if subscribed show it 
    <div className='flex flex-col space-y-2'>
      <button onClick={() => createCheckoutSession()} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Sign Up
      </button>
    </div>
  );
};

export default CheckoutButton;
