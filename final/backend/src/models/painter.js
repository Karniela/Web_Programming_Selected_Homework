import mongoose from 'mongoose'
const Schema = mongoose.Schema
const PainterSchema = new Schema({
    name: { type: String, required: true },
    imgsrc: { type: String },
    description: { type: String },
    analysis:{ type: String },
}, { collection: 'painter'})
const Painter = mongoose.model('painter', PainterSchema)
export default Painter