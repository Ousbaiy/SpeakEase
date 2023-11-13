'use client';

import useAdminId from '@/hooks/useAdminId';
import { ChatMembers, chatMembersRef } from '@/lib/converters/ChatMembers';
import { Loader2 } from 'lucide-react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatMembersBadge = ({ chatId }: { chatId: string }) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const adminId = useAdminId({ chatId });

  if (loading && !members)
    return <Loader2 className="h-5 w-5 animate-spin mx-auto" />;

  return <div>ChatMembersBadge</div>;
};

export default ChatMembersBadge;
