import { authOptions } from '@/auth';
import AdminControls from '@/components/AdminControls';
import ChatInput from '@/components/ChatInput';
import ChatMembersBadge from '@/components/ChatMembersBadge';
import ChatMessages from '@/components/ChatMessages';
import { ChatMembers, chatMembersRef } from '@/lib/converters/ChatMembers';
import { sortedMessagesRef } from '@/lib/converters/Messages';
import { getDocs } from 'firebase/firestore';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params: { chatId },
}: any): Promise<Metadata> {
  const chatMembers = (await getDocs(chatMembersRef(chatId))).docs.map((doc) =>
    doc.data()
  );
  // Function to filter chat members by isAdmin: true and return their emails
  const getAdminEmails = (members: ChatMembers[]) => {
    return members
      .filter((member: ChatMembers) => member.isAdmin)
      .map((admin) => admin.email);
  };
  // Example usage
  const adminEmail = getAdminEmails(chatMembers);
  return {
    title: `Chat created by ${adminEmail}`,
  };
}

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user?.id!);

  if (!hasAccess) {
    redirect('/chat?error=permission');
  }

  return (
    <div
      style={{ height: `calc(100vh - 80px)` }}
      className="flex flex-col h-screen"
    >
      <AdminControls chatId={chatId} />
      <ChatMembersBadge chatId={chatId} />

      <div className="flex-1">
        <ChatMessages chatId={chatId} initialMessages={initialMessages} />
      </div>

      <ChatInput chatId={chatId} />
    </div>
  );
};

export default ChatPage;
