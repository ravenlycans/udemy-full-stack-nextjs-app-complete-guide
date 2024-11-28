import { transformImageUrl } from "@/lib/util";
import { MessageDTO } from "@/types";
import { Avatar } from "@nextui-org/react";
import clsx from 'clsx';

type Props = {
  message: MessageDTO;
  currentUserId: string;
};

export default function MessageBox({ message, currentUserId }: Props) {
  const isCurrentUserSender = message.senderId === currentUserId;

    const renderAvatar = () => (
        <Avatar 
            name={message.senderName}
            className="self-end"
            src={transformImageUrl(message.senderImage) || '/images/user.png'}
        />
    );

  return (
    <div className="grid grid-rows-1">
        <div className={clsx('flex gap-2 mb-3', {
            'justify-start text-right': isCurrentUserSender,
            'justify-end': !isCurrentUserSender
        })}>
            {!isCurrentUserSender && renderAvatar()}
            <div>
                Message Content
            </div>
            {isCurrentUserSender && renderAvatar()}
        </div>
    </div>
  )
}
