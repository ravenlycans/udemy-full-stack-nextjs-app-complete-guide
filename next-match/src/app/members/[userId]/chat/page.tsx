import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";

export default async function ChatPage({params}: {params: {userId: string}}) {
  const {userId} = await params;
  const messages = await getMessageThread(userId);

  console.log({messages});
  
  return (
    <CardInnerWrapper 
      header="Chat"
      body={<div>Chat goes here</div>}
      footer={<ChatForm />}
    />
  );
}
