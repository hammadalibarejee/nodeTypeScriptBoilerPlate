"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClass = void 0;
const http_1 = require("../../server/http");
const socketio = __importStar(require("socket.io"));
class SocketClass {
    static SocketConnection(httpServer) {
        http_1.HTTPServer.io = new socketio.Server(httpServer, {
            allowEIO3: true,
            cors: {
                origin: true,
                methods: ['GET', 'POST'],
                credentials: true,
            }
        });
        http_1.HTTPServer.io.use(async (socket, next) => {
            try {
                console.log("Socket Middleware");
                next();
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
        http_1.HTTPServer.io.on("connection", (socket) => {
            console.log("Connected: ");
            socket.on("disconnect", () => {
                console.log("Disconnected: ");
            });
            socket.on("chatroomMessage", async ({ message }) => {
                let s = http_1.HTTPServer.io.emit("newMessage", {
                    message,
                });
                if (s) {
                    http_1.HTTPServer.io.emit('Acknowledge', {
                        message: "Data Received"
                    });
                }
            });
        });
    }
}
exports.SocketClass = SocketClass;
//   socket.on("chat_start", async ({ toUserID }: any) => {
//     if (toUserID == socket.userId) return console.error("InvalidIDS");
//     let checkToUser = await UserModel.FindUserById(toUserID);
//     console.log("ToUserDetails>>>>>>>>>>>>>>>>>>>>", checkToUser, toUserID);
//     console.log("SocketUserID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", socket.userId);
//     if (!checkToUser) return console.error("User doesnot exist");
//     const chat = await ChatModel.createChat({
//       userID1: socket.userId,
//       userID2: toUserID,
//     });
//     console.log("ChatHasBeenCreated", chat)
//     socket.emit("chat_start", chat);
//   })
//   socket.on("joinRoom", async ({ chatroomId }: any) => {
//     let authenticateChat = await ChatModel.checkChatExistAgainstUserID(socket.userId, chatroomId);
//     if (authenticateChat.length) {
//       socket.join(chatroomId);
//       console.log("A user joined chatroom:" + chatroomId);
//     }
//     // socket.join(chatroomId);
//     // console.log("A user joined chatroom:" + chatroomId);
//   });
//   socket.on("leaveRoom", ({ chatroomId }: any) => {
//     socket.leave(chatroomId);
//     console.log("A user left chatroom: " + chatroomId);
//   });
//   socket.on('isTyping', ({ chatroomId, typingStatus }: any) => {
//     let rooms = [...socket.rooms];
//     console.log(chatroomId);
//     let isJoined: boolean = false;
//     rooms.forEach((data) => {
//       console.log(data, chatroomId, 'wdasdasdasdasdas');
//       if (data == chatroomId) {
//         isJoined = true
//       }
//     })
//     console.log("isJoinedStatus------------------", isJoined);
//     if (isJoined) {
//       HTTPServer.io.to(chatroomId).emit("Typing", {
//         typingStatus,
//         fromUserID: socket.userId,
//       });
//     }
//   });
//# sourceMappingURL=chat.js.map