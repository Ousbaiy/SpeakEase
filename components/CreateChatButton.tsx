'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Loader2, MessageSquarePlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from './ui/use-toast';
import { useSubscriptionStore } from '@/store/store';
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { addChatRef } from '@/lib/converters/ChatMembers';

const CreateChatButton = ({ isLarge }: { isLarge?: boolean }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const router = useRouter();

  const createNewChat = async () => {
    if (!session?.user.id) return;
    setLoading(true);

    toast({
      title: 'Creating a new chat...',
      description: 'Hold tight while we create your new chat...',
      duration: 3000,
    });

    const chatId = crypto.randomUUID();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || '',
    })
      .then(() => {
        toast({
          title: 'Success',
          description: 'Your chat has been created',
          className: 'bg-green-600 text-white',
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'There was an error creating your chat',
          variant: 'destructive',
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge) {
    return (
      <div>
        <Button onClick={createNewChat}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Create a New Chat'
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton;
