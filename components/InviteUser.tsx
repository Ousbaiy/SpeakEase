'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { useToast } from './ui/use-toast';
import useAdminId from '@/hooks/useAdminId';
import { useRouter } from 'next/navigation';
import { useSubscriptionStore } from '@/store/store';
import { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';
import { Input } from './ui/input';
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { addChatRef, chatMembersRef } from '@/lib/converters/ChatMembers';
import { ToastAction } from './ui/toast';
import { getUserByEmailRef } from '@/lib/converters/User';
import ShareLink from './ShareLink';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

const InviteUser = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;

    toast({
      title: 'Sending ivite',
      description: 'Please wait while we send the invite.',
    });

    // get thet users current chat
    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    // check if the user is about to exceed the PRO plan which is 3 chats
    const isPro =
      subscription?.status === 'active' || subscription?.role === 'pro';

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: 'Free plan limit exceeded',
        description:
          "You've exceeded the limit of 2 users in a single chat for the FREE plan. Ugrade to PRO to continue adding users to chats.",
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
      return;
    }

    const queySnapshot = await getDocs(getUserByEmailRef(values.email));

    if (queySnapshot.empty) {
      toast({
        title: 'User not found',
        description:
          'Please enter an email adress of a registered user Or resend the invitition once they have signed up.',
        variant: 'destructive',
      });
      return;
    } else {
      // user found
      const user = queySnapshot.docs[0].data();

      // Check if the user is already in the chat
      const chatMembers = (await getDocs(chatMembersRef(chatId))).docs.map(
        (doc) => doc.data()
      );
      if (chatMembers.some((member) => member.userId === user.id)) {
        toast({
          title: 'User already in chat',
          description: 'The user is already in the chat.',
          variant: 'destructive',
        });
        return;
      }

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        isAdmin: false,
        chatId: chatId,
        image: user.image || '',
      })
        .then(() => {
          setOpen(false);

          toast({
            title: 'Added to chat',
            description: 'The user has been added to the chat successfully.',
            className: 'bg-green-600 text-white',
            duration: 3000,
          });

          setOpenInviteLink(true);
        })
        .catch(() => {
          toast({
            title: 'Error',
            description:
              'Whoops...there was an error adding the user to the chat!.',
            variant: 'destructive',
          });

          setOpen(false);
        });
    }

    form.reset();
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User To Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email adress to invite them to this
                chat!{' '}
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="john@deo.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="ml-auto sm:w-fit w-full">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
};

export default InviteUser;
