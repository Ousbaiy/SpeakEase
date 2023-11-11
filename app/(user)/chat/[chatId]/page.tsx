import ChatInput from '@/components/ChatInput';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession();

  return (
    <div>
      {/* admin controls */}

      {/* chat memberbadge */}

      {/* chatmessages */}

      {/* chatInput */}
      {/* 4.26 */}
      <ChatInput chatId={chatId} />
    </div>
  );
};

export default ChatPage;
