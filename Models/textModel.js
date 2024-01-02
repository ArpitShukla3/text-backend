import mongoose from "mongoose";
const text = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name:
    {
        type: String,
    },
    content: {
        type: String,
    }
},
    {
        timestamps: true
    })

const Text = mongoose.model("Text", text);
export default Text;     