'use client';

import { useSession } from 'next-auth/react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  User,
  limitedMessagesRef,
  messagesRef,
} from '@/lib/converters/Messages';
import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSubscriptionStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    input: z.string().max(1000),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputCopy = values.input.trim();
    form.reset();


    if (values.input.length === 0) return;
    if (!session?.user) return;

    // check if user pro
    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === 'pro' && subscription?.status === 'active';

    if (!isPro && messages >= 20) {
      toast({
        title: 'Free plan limit exceeded',
        description:
          "You've exceeded the FREE plan limit of 20 messages per chat. Ugrade to PRO to send unlimited messages.",
        variant: 'destructive',
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push('/register')}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
    }

    const userToStore: User = {
      id: session?.user?.id!,
      email: session?.user?.email!,
      name: session?.user?.name!,
      image: session?.user?.image || '',
    };

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  }

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter a message in ANY language..."
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-600 hover:bg-violet-800 duration-300 transition-colors text-white"
          >
            send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
