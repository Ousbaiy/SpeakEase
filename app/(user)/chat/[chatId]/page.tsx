import ChatInput from '@/components/ChatInput';
import ChatMembersBadge from '@/components/ChatMembersBadge';
import ChatMessages from '@/components/ChatMessages';
import { sortedMessagesRef } from '@/lib/converters/Messages';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession();

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <div className='flex flex-col h-screen'>
      <ChatMembersBadge chatId={chatId} />
      {/* chat memberbadge */}

      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          initialMessages={initialMessages}
        />
      </div>

      <ChatInput chatId={chatId} />
    </div>
  );
};

export default ChatPage;
