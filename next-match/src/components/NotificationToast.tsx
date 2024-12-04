import Link from "next/link";
import {Image} from "@nextui-org/react";
import {transformImageUrl} from "@/lib/util";
import {MessageDTO} from "@/types";
import { toast } from "react-toastify";

type Props = {
    image?: string | null;
    href: string;
    title: string;
    subtitle?: string;
}

export default function NotificationToast({image, href, title, subtitle}: Props) {
    return (
        <Link
            href={href}
            className='flex items-center'
        >
            <div className='mr-2'>
                <Image
                    src={transformImageUrl(image) || '/images/user.png'}
                    height={50}
                    width={50}
                    alt='Sender image'
                />
            </div>
            <div className='flex flex-grow flex-col justify-center'>
                <div className='font-semibold'>{title}</div>
                <div className='text-sm'>{subtitle || 'Click to view'}</div>
            </div>
        </Link>
    );
}

export const newMessageToast = (message: MessageDTO) => {
    toast(
        <NotificationToast
            image={message.senderImage}
            href={`/members/${message.senderId}/chat`}
            title={`${message.senderName} has sent you a new message.`}
        />
    );
}

export const newLikeToast = (userName: string, image: string | null, userId: string)=> {
    toast(
        <NotificationToast
            image={image}
            href={`/members/${userId}`}
            title={`You have been liked by ${userName}`}
            subtitle='Click here to view their profile.'
        />
    );
}