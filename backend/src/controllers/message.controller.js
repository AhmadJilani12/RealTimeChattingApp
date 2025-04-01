import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import Cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterdUsers);
    } catch (error) {
        console.log("Error in get Users for Sidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        })

        res.status(200).json(messages)
    }
    catch (error) {
        console.log("Error in get Message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });


    }

};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await Cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message(
            {
                senderId,
                receiverId,
                text,
                image: imageUrl
            }
        )
        await newMessage.save();
        //todo: realtime functionality goes here  =>  socket.io
        res.status(201).json(newMessage);
    } catch (error) {
     console.log("Error in sendMessage Controller" , error.message);
     res.status(500).json({error: "Internal Server Error"});
     
    }
}