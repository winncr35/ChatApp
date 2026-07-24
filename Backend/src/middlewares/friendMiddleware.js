import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

export const checkFriendship = async (req, res, next) => {
    try {
        const me = req.user._id.toString();
        const recipientId = req.body?.recipientId ?? null;
        const memberIds = req.body?.memberIds ?? [];
        if (!recipientId && memberIds.length === 0) {
            return res.status(400).json({ message: "recipienId or memberIds must be provided" })
        }

        if (recipientId) {
            const [userA, userB] = pair(me, recipientId);

            const isFriend = await Friend.findOne({ userA, userB });
            if (!isFriend) {
                return res.status(403).json({ message: "You are not friends with this person yet " })
            }
            return next();
        }
        //todo : group chat
        const friendChecks = memberIds.map(async (memberId) => {
            const [userA, userB] = pair(me, memberId);

            const friend = await Friend.findOne({ userA, userB });
            return friend ? null : memberId;
        })
        const results = await Promise.all(friendChecks);
        const notFriends = results.filter(Boolean);
        if (notFriends.length > 0) {
            return res.status(403).json({ message: "You must add your friend only into group", notFriends })

        }
        next();
    }
    catch (error) {
        console.error("Error while checkFriendship", error);
        return res.status(500).json({ message: "System Error" })



    }

}

export const checkGroupMembership = async (req, res, next) => {
    try {
        const { conversationId } = req.body;
        const userId = req.user._id;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Can not find any conversation" })
        }
        const isMember = conversation.participants.some((p) => p.userId.toString() === userId.toString());
        if (!isMember) {

            return res.status(403).json({ message: "You are not a member of this group chat" })
        }
        req.conversation = conversation;
        next();

    }
    catch (error) {
        console.error("Error checkGroupMembership", error);
        return res.status(500).json({ message: "System Error" })
    }
}