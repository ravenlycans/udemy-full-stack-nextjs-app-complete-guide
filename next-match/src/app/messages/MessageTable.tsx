"use client";

import { MessageDTO } from "@/types";
import {
  Card,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key } from "react";

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
  ];

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

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
                  <div
                    className={`${
                      !item.dateRead && !isOutbox ? "font-semibold" : ""
                    }`}
                  >
                    {getKeyValue(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
