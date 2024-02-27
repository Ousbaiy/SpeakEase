import { authOptions } from '@/auth';
import { chatMembersCollectionGroupRef } from '@/lib/converters/ChatMembers';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import ChatListRows from './ChatListRows';
import { adminDb } from '@/firebase-admin';

const ChatList = async () => {
  const session = await getServerSession(authOptions);

  const doc = await adminDb.collection('customers').doc(session?.user?.id!).get();
  const stripeId = doc.data()!.stripeId;


  const chatSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user?.id!)
  );

  const initialChats = chatSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }))

  return (
    <div>
      <ChatListRows initialChats={initialChats} />
    </div>
  );
};

export default ChatList;
