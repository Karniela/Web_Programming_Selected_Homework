import mongoose from 'mongoose';

const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
/*const UserSchema = new Schema({
  name: {type: String, required: [true, "Name field is required."]},
  chatBoxes: [{type: mongoose.Types.ObjectId, ref: "ChatBox"}],
})
const UserModel = mongoose.model("User", UserSchema);*/

const MessageSchema = new Schema({
  //chatBox: {type: mongoose.Types.ObjectId, ref: "ChatBox"},
  sender: {type: String, required: [true, "Sender field is required."]}, 
  body: {type: String, required: [true, 'Body field is required.']}
})
const MessageModel = mongoose.model("Message", MessageSchema);

const chatBoxSchema = new Schema({
  name: {type: String, required: [true, "Name field is required."]},
  users: [{type: String, required: [true, "User field is required."]}],
  message: [{type: mongoose.Types.ObjectId, ref: "Message"}]
})
const ChatBoxModel = mongoose.model("ChatBox", chatBoxSchema);


export { MessageModel, ChatBoxModel};