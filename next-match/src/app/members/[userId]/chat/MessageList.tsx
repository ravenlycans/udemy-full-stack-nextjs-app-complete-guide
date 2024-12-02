'use client';
import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {useCallback, useEffect, useState} from "react";
import {pusherClient} from "@/lib/pusher";
import {MessageDTO} from "@/types";

type Props = {
    initialMessages: MessageDTO[];
    currentUserId: string;
    chatId: string;
}

export default function MessageList({initialMessages, currentUserId, chatId}: Props) {
    const [messages, setMessages] = useState(initialMessages);

    const handleNewMessage = useCallback((message: MessageDTO) => {
        setMessages(prevState => {
            return [...prevState, message];
        });
    }, []);

    useEffect(() => {
        const channel = pusherClient.subscribe(chatId);

        channel.bind('message:new', handleNewMessage);
        return () => {
            channel.unsubscribe();
            channel.unbind('message:new', handleNewMessage);
        }
    }, [chatId, handleNewMessage]);

    return (
        <div>
            {messages.length === 0 ? 'No message to display' : (
                <div>
                    {messages.map(message => (
                        <MessageBox
                            key={message.id}
                            message={message}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}