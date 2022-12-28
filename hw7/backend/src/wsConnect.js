import {MessageModel, ChatBoxModel} from './models/chatbox.js';

const chatBoxes = {};
const sendData = (data, ws) => { ws.send(JSON.stringify(data)); }
const sendStatus = (payload, ws) => { sendData(["status", payload], ws); }
const broadcastMessage = (ws, data, status) => {
    chatBoxes[ws.box].forEach(e => {
        sendData([status, data], e);
    });
    //sendStatus(status, client);
};

const makeName = (name, to) => {
    return [name, to].sort().join('_');
}

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      box = await new ChatBoxModel({ name, users: participants}).save();
    return  box.populate({path: "message"});
};
   
   

export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const { data } = byteString
            const {type, payload} = JSON.parse(data)
            switch (type) {  
                case 'CHAT': {
                    console.log("CHAT");
                    const {name, to} = payload;
                    if (ws.box !== "" && chatBoxes[ws.box])
                        // user(ws) was in another chatbox
                        chatBoxes[ws.box].delete(ws);  
                    const boxName = makeName(name, to);       
                    ws.box = boxName;
                    if (!chatBoxes[boxName])
                        chatBoxes[boxName] = new Set();
                    chatBoxes[boxName].add(ws);
                    const box = await validateChatBox(boxName, [name, to]);
                    sendData(["chatinit", box.message], ws)
                    //sendStatus(['success', 'Chat box created.'], ws)
                    break;
                }
                case 'MESSAGE': {
                    console.log("MESSAGE");
                    const {name, to, body} = payload;
                    const boxName = makeName(name, to);
                    //chatBoxes[boxName].add(ws);
                    // Save payload to DB
                    const message = new MessageModel({ sender: name, body: body })
                    try { 
                        await message.save();
                    } catch (e) { throw new Error
                    ("Message DB save error: " + e); }
                    await ChatBoxModel.updateOne({name: boxName}, {$push: {"message": message}})
                    // Respond to client
                    //sendData(['output', {sender: name, body}], ws)
                    broadcastMessage(ws, {sender: name, body}, "output");
                    //sendStatus(['success','Message sent.'], ws)
                    break;
                }
                case 'CLEAR': {
                    break;
                }
                default:
                    break;         
            }
            ws.on('close', () => {
                if (ws.box !== "" && chatBoxes[ws.box]){
                    // user(ws) was in another chatbox
                    chatBoxes[ws.box].delete(ws);
                } 
            })
            //console.log(chatBoxes);
        }
    )

    
}