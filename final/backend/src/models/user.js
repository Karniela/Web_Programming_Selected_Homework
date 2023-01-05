import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    hashed_pwd: { type: String, required: true },
}, { collection: 'users'})
const User = mongoose.model('user', UserSchema)
export default User