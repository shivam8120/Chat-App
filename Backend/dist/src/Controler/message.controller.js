import prisma from '../db/db.js';
import { getReceiverSocketId, io } from '../Socket/Socket.js';
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { id: receiverId } = req.params;
        const { message } = req.body;
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId]
                }
            }
        });
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId]
                    }
                }
            });
        }
        const newMessages = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id
            }
        });
        if (newMessages) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessages.id
                        }
                    }
                }
            });
        }
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessages", newMessages);
        }
        res.status(201).json(newMessages);
    }
    catch (error) {
        console.error("error in send message", error.message);
        res.status(500).json({ msg: "error in sending message" });
    }
};
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, userToChatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAT: "asc"
                    }
                }
            }
        });
        if (!conversation) {
            return res.status(200).json({ messages: [] });
        }
        res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.error("error in getting message", error.message);
        res.status(500).json({ msg: "Internal server error in getMessage" });
    }
};
export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId
                }
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true
            }
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("error in getting message", error.message);
        res.status(500).json({ msg: "Internal server error in getMessage" });
    }
};
