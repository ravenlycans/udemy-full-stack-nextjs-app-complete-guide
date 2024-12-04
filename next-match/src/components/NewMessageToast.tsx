import { MessageDTO } from "@/types";
import Link from "next/link";
import {Image} from "@nextui-org/react";
import {transformImageUrl} from "@/lib/util";
import {toast} from "react-toastify";

type Props = {
    message: MessageDTO;
}
export function NewMessageToast({message}: Props) {
    return (
        <Link
              href={`/members/${message.senderId}/chat`}
              className='flex item-center'
        >
            <div className='mr-2'>
                <Image
                    src={transformImageUrl(message.senderImage) || '/images/user.png'}
                    height={50}
                    width={50}
                    alt='sender image'
                />
            </div>
            <div className='flex flex-grow flex-col justify-center'>
                <div className='font-semibold'>{message.senderName} sent you a message</div>
                <div className='text-sm'>Click to view</div>
            </div>
        </Link>
    );
}

export const newMessageToast = (message: MessageDTO) => {
    toast(<NewMessageToast message={message} />);
}