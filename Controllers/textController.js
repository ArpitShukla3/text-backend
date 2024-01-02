import Text from "../Models/textModel.js";


export async function create(req, res) {
    const { name } = req.body;
    if (!req.user._id) {
        return res.status(400).json({
            success: false,
            message: "failed to craete new text"
        })
    }
    try {
        const text = await Text.create({
            user: req.user._id,
            name: name,
            content: ""
        })
        res.status(200).json({
            success: true,
            data: "Created successfully:",
            text: text
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });

    }
}
export async function read(req, res) {
    if (!req.user._id) {
        return res.status(400).json({
            success: false,
            message: "failed to recognize user, login again"
        })
    }
    try {
        const listOfNotes = await Text.find({ user: req.user._id })
        res.status(200).json({
            success: true,
            listOfNotes: listOfNotes

        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });

    }
}
export async function update(req, res) {
    const { textID, content } = req.body;
    if (!req.user._id) {
        return res.status(400).json({
            success: false,
            message: "failed to recognize user, login again"
        })
    }
    if (!req.body.textID) {
        return res.status(400).json({
            success: false,
            message: "textId missing in the body"
        })
    }
    if (!content && content !== "") {
        return res.status(400).json({
            success: false,
            message: "content missing in the body"
        })
    }
    try {
        const exists = await Text.findOne({ _id: textID })
        if (!exists) {
            return res.status(400).json({
                success: true,
                message: "Invalid request"
            })
        }
        const text = await Text.findByIdAndUpdate(textID, {
            content: content
        }, { new: true })
        res.status(200).json({
            success: true,
            data: "updated successfully:",
            text: text
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });

    }
}
export async function terminate(req, res) {
    const { id } = req.body;
    console.log(req.body)
    if (!id) {
        return res.status(200).json({
            success: true,
            message: "chat ID is missing"
        })
    }
    try {
        const exists = await Text.findOne({ _id: id })
        console.log(exists)
        if (!exists) {
            return res.status(400).json({
                success: true,
                message: "Note already deleted/does not exists"
            })
        }
        const data = await Text.deleteOne({ _id: id });
        return res.status(200).json({
            success: true,
            message: data
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }

}