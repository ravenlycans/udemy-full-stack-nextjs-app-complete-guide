import {useRouter, useSearchParams} from "next/navigation";
import {Key, useCallback, useEffect, useState} from "react";
import {MessageDTO} from "@/types";
import {deleteMessage} from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import {useShallow} from "zustand/react/shallow";

export const useMessages = (initialMessages: MessageDTO[]) => {
    const [set, remove, messages, updateUnreadCount] = useMessageStore(useShallow((state) => [state.set, state.remove, state.messages, state.updateUnreadCount]));
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isDeleting, setDeleting] = useState({ id: "", loading: false });

    const isOutbox = searchParams.get("container") === "outbox";

    useEffect(() => {
        set(initialMessages);

        return () => {
            set([]);
        }
    }, [initialMessages, set]);

    const columns = [
        {
            key: isOutbox ? "recipientName" : "senderName",
            label: isOutbox ? "Recipient" : "Sender",
        },
        { key: "text", label: "Message" },
        { key: "createdAt", label: isOutbox ? "Date sent" : "Date Received" },
        { key: "actions", label: "Actions" },
    ];

    const handleDeleteMessage = useCallback(
        async (message: MessageDTO) => {
            setDeleting({ id: message.id, loading: true });
            await deleteMessage(message.id, isOutbox);
            remove(message.id);
            if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
            setDeleting({ id: "", loading: false });
        },
        [isOutbox, remove, updateUnreadCount]
    );

    const handleRowSelect = (key: Key) => {
        const message = messages.find((m) => m.id === key);
        const url = isOutbox
            ? `/members/${message?.recipientId}`
            : `/members/${message?.senderId}`;
        router.push(url + "/chat");
    };

    return {
        isOutbox,
        columns,
        deleteMessage: handleDeleteMessage,
        selectRow: handleRowSelect,
        isDeleting,
        messages,
    }
}