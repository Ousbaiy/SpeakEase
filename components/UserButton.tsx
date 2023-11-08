'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from './UserAvatar';

import { signIn, signOut } from 'next-auth/react';

import { Session } from 'next-auth';
import { Button } from './ui/button';
import { useSubscriptionStore } from '@/store/store';
import { Loader2, StarIcon } from 'lucide-react';
import ManageAccountButton from './ManageAccountButton';

const UserButton = ({ session }: { session: Session | null }) => {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) {
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session?.user?.name || ''}
          image={session?.user?.image || ''}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name || ''}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {subscription === undefined && (
          <DropdownMenuItem>
            <Loader2 className="h-5 w-5 animate-spin" />
          </DropdownMenuItem>
        )}

        {subscription?.role === 'pro' && (
          <>
            <DropdownMenuLabel className="flex items-center justify-center space-x-1 text-xs text-[#E935C1] animate-pulse">
              <StarIcon className="h-5 w-5" />
              <p>PRO</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <ManageAccountButton />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
