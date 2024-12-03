import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageList from "@/app/members/[userId]/chat/MessageList";
import {getAuthUserId} from "@/app/actions/authActions";
import {createChatId} from "@/lib/util";

export default async function ChatPage({params}: {params: {userId: string}}) {
  const userId = await getAuthUserId();
  const messages = await getMessageThread((await params).userId);
  const chatId = createChatId(userId, (await params).userId);

  return (
    <CardInnerWrapper 
      header="Chat"
      body={
        <MessageList
            initialMessages={messages}
            currentUserId={userId}
            chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
}
