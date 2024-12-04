import {MessageDTO} from "@/types";
import PresenceAvatar from "@/components/PresenceAvatar";
import {truncateString} from "@/lib/util";
import {Button} from "@nextui-org/react";
import {AiFillDelete} from "react-icons/ai";

type Props = {
    item: MessageDTO;
    columnKey: string;
    isOutbox: boolean;
    deleteMessage: (message: MessageDTO) => void;
    isDeleting: boolean;
}

export function MessageTableCell({item, columnKey, isOutbox, deleteMessage, isDeleting}: Props) {

    const cellValue = item[columnKey as keyof MessageDTO];

    switch (columnKey) {
        case "recipientName":
        case "senderName":
            return (
                <div className='flex item-center gap-2 cursor-pointer'>
                    <PresenceAvatar
                        userId={isOutbox ? item.recipientId : item.senderId}
                        src={isOutbox ? item.recipientImage : item.senderImage}
                    />
                    <span>{cellValue}</span>
                </div>
            );
        case "text":
            return <div>{truncateString(cellValue, 80)}</div>;
        case "createdAt":
            return cellValue;
        default:
            return (
                <Button
                    isIconOnly
                    variant='light'
                    onClick={() => deleteMessage(item)}
                    isLoading={isDeleting}
                >
                    <AiFillDelete size={24} className='text-danger' />
                </Button>
            );
    }
}
