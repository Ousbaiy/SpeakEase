import ChatList from '@/components/ChatList';
import ChatPermissionError from '@/components/ChatPermissionError';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat',
}

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

const Chat = ({ searchParams: { error } }: Props ) => {
  
  
  return (
    <div className='p-5'>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      <ChatList />
    </div>
  );
};

export default Chat;
