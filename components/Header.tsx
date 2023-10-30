import Link from 'next/link';

import { Button, buttonVariants } from './ui/button';
import { ModeToggle } from './ModeToggle';
import UserButton from './UserButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { MessagesSquareIcon } from 'lucide-react';
import CreateChatButton from './CreateChatButton';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900">
      <nav className="flex flex-col gap-5 sm:flex-row items-center p-5 max-w-7xl mx-auto bg-white dark:bg-gray-900">
        <Link href="/">
          <span className="flex z-40 font-bold text-2xl">SpeakeEase</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-3">
          {/* lang select */}

          {session ? (
            <>
              <Link
                href="/chat"
                prefetch={false}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                <MessagesSquareIcon className="h-6 w-6" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link
              href="/pricing"
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            >
              Priciing
            </Link>
          )}

          <ModeToggle />
          <UserButton session={session} />
        </div>
      </nav>

      {/* upgrade banner  */}
    </header>
  );
};

export default Header;
