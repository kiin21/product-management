const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');
// [get] /chat
module.exports.index = async (req, res) => {
    const user_id = res.locals.user._id;
    const userFullname = res.locals.user.fullname;
    // socket.io
    _io.once('connection', (socket) => {

        socket.on("CLIENT_SEND_MSG", async function (msg) {
            // save to db
            const record = new Chat({
                user_id: user_id,
                message: msg
            })
            await record.save();
            console.log('msggg: ', msg);

            _io.emit("SERVER_RETURN_MSG", {
                user_id: user_id,
                senderFullname: userFullname,
                message: msg
            });
        });
    });
    //end socket.io

    // load chats from db
    const chats = await Chat.find({ deleted: false });
    for (let i = 0; i < chats.length; i++) {
        const user = await User.findById(chats[i].user_id).select('fullname');
        chats[i].user = user;
        chats[i].user_id.toString();
    }
    // end load chats from db



    res.render('client/pages/chat/index', {
        pageTitle: 'Chat',
        chats: chats,
        user_id: user_id.toString()
    });
}