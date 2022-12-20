import { ChatBoxModel } from "../models/chatbox.js";

const makeName = (name, to) => {
  return [name, to].sort().join('_');
}

const Query = {
  chatbox: async (parent, { name1, name2 }, {db}, info) => {
    const name = makeName(name1, name2)
    console.log(name)
    let box = await ChatBoxModel.findOne({name:name});
    if (!box)
      box = await new ChatBoxModel({name:name}).save();
    return box;
}, };
export default Query;