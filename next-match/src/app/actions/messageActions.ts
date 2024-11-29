'use server';

import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDTO } from "@/lib/mappings";

export async function createMessage(recipientUserId: string, data: MessageSchema): Promise<ActionResult<Message>> {
    try {
        const userId = await getAuthUserId();

        const validated = messageSchema.safeParse(data);

        if (!validated.success) return {status: 'error', error: validated.error.errors}

        const {text} = validated.data;

        const message = await prisma.message.create({
            data: {
                text,
                recipientId: recipientUserId,
                senderId: userId
            }
        })

        return {status: 'success', data: message}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Something went wrong'}
    }
}

export async function getMessageThread(recipientId: string) {
    try {
        const userId = await getAuthUserId();

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        recipientId,
                    },
                    {
                        senderId: recipientId,
                        recipientId: userId,
                    }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true,
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true,
                    }
                }
            },
        });

        return messages.map(message => mapMessageToMessageDTO(message));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMessagesByContainer(container: string) {
    try {
        const userId = await getAuthUserId();

        const selector = container === 'outbox' ? 'senderId' : 'recipientId';

        const messages = await prisma.message.findMany({
            where: {
                [selector]: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true,
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true,
                    }
                }
            },
        });

        return messages.map(message => mapMessageToMessageDTO(message));

    } catch (error) {
        console.log(error);
        throw error;
    }
}