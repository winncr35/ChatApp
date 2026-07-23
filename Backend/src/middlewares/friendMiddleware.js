import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

export const checkFriendship = async (req, res, next) => {
    try {
        const me = req.user._id.toString();
        const recipientId = req.body?.recipientId ?? null;
        if (!recipientId) {
            return res.status(400).json({ message: "recipienId must be provided" })
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
    }
    catch (error) {
        console.error("Error while checkFriendship", error);
        return res.status(500).json({ message: "System Error" })



    }
}