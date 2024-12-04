import {useRouter, useSearchParams} from "next/navigation";
import {Key, useCallback, useState} from "react";
import {MessageDTO} from "@/types";
import {deleteMessage} from "@/app/actions/messageActions";

export const useMessages = (messages: MessageDTO[]) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isDeleting, setDeleting] = useState({ id: "", loading: false });

    const isOutbox = searchParams.get("container") === "outbox";

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
            router.refresh();
            setDeleting({ id: "", loading: false });
        },
        [isOutbox, router]
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
    }
}