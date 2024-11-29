"use client";

import { MessageDTO } from "@/types";
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback } from "react";
import { AiFillDelete } from "react-icons/ai";

type Props = {
  messages: MessageDTO[];
};

export default function MessageTable({ messages }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  const renderCell = useCallback(
    (item: MessageDTO, columnKey: keyof MessageDTO) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "recipientName":
        case "senderName":
          return (
            <div
              className={`flex item-center gap-2 cursor-pointer ${
                !item.dateRead && !isOutbox ? "font-semibold" : ""
              }`}
            >
              <Avatar
                alt='Image of member'
                src={
                  (isOutbox ? item.recipientImage : item.senderImage) ||
                  "/images/user.png"
                }
              />
              <span>{cellValue}</span>
            </div>
          );
        case "text":
          return <div className='truncate'>{cellValue}</div>;
        case "createdAt":
          return cellValue;
        default:
          return (
            <Button isIconOnly variant='light'>
              <AiFillDelete size={24} className='text-danger' />
            </Button>
          );
      }
    },
    [isOutbox]
  );

  return (
    <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
      <Table
        aria-label='table with messages'
        selectionMode='single'
        onRowAction={(key) => handleRowSelect(key)}
        shadow='none'
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent='No messages for this container'
        >
          {(item) => (
            <TableRow key={item.id} className='cursor-pointer'>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof MessageDTO)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
