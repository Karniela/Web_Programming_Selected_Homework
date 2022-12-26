import { MessageModel, ChatBoxModel } from "./models/chatbox.js";

const makeName = (name, to) => { return [name, to].sort().join("-"); };

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        box = await new ChatBoxModel({ name, users: participants }).save();
    }
    return box.populate(["users", { path: "messages", populate: "sender" }]);
};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const broadcastMessages = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
}

const chatBoxes = {};

export default {

    onMessage: async (evt, ws, wss) => {
            const data = JSON.parse(evt.data);
            const task = data['type'];
            const payload = data['payload'];
            // const [task, payload] = JSON.parse(data);
            // console.log(task, payload);
            switch (task) {
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessages(wss, ["cleared"], {
                            type: "Info",
                            msg: "Message cache cleared" });
                    })
                    break;
                }
                case 'CHAT': {
                    // open new chatbox or switch to existing one
                    // load messages from DB
                    // send messages to client
                    const { name, to } = payload;
                    const chatName = makeName(name, to);
                    console.log('CHAT', chatName);
                    if (!chatBoxes[chatName]) {
                        chatBoxes[chatName] = new Set();
                    }
                    chatBoxes[chatName].add(ws);
                    // check if chatbox exists
                    const chatbox = await ChatBoxModel.findOne
                        ({ name: chatName });
                    if (chatbox) {
                        // chatbox exists
                        // send messages to client
                        // get messages from DB
                        const messages = await MessageModel.find
                            ({ chatBox: chatName });
                        sendData(["output", messages], ws);
                        sendStatus({
                            type: "success",
                            msg: "Chatbox loaded." }, ws);
                    } else {
                        // chatbox does not exist
                        // create new chatbox
                        const newChatBox = new ChatBoxModel({
                            name: chatName,
                            users: [name, to],
                            messages: []
                        });
                        try {
                            await newChatBox.save();
                        } catch (e) {
                            throw new Error
                                ("ChatBox DB save error: " + e);
                        }
                        // send messages to client
                        sendData(["output", []], ws);
                        sendStatus({
                            type: "success",
                            msg: "Chatbox created." }, ws);
                        // update ws's active chatbox
                    }
                    if (ws.box !== "" && chatBoxes[ws.box]) {
                        chatBoxes[ws.box].delete(ws);
                    }
                    ws.box = chatName;
                    break;
                }
                case 'MESSAGE': {
                    // save message to DB
                    // send message to client
                    const { name, to, body } = payload;
                    const chatName = makeName(name, to);
                    console.log('MESSAGE', chatName, body);
                    const message = new MessageModel({
                        chatBox: chatName,
                        sender: name,
                        body: body
                    });
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }
                    // update chatbox's messages
                    const chatbox = await validateChatBox(chatName, [name, to]);
                    chatbox.messages.push(message);
                    try {
                        await chatbox.save();
                    } catch (e) {
                        throw new Error("ChatBox DB save error: " + e);
                    }
                    // send message to client
                    // find ws in chatBoxes[chatName], send messages
                    const messages = await MessageModel.find
                        ({ chatBox: chatName });
                    if (chatBoxes[chatName]) {
                        chatBoxes[chatName].forEach((client) => {
                            sendData(["output", messages], client);
                            sendStatus({
                                type: "success",
                                msg: "Message update."}, client);
                        });
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
}