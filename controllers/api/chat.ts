import { HTTPServer } from "../../server/http";
import * as socketio from 'socket.io'



export abstract class SocketClass {
    static SocketConnection(httpServer: Express.Application) {
        HTTPServer.io = new socketio.Server(httpServer, {
            allowEIO3: true,
            cors: {
                origin: true,
                methods: ['GET', 'POST'],
                credentials: true,

            }
        })

        HTTPServer.io.use(async (socket: any, next) => {

            try {
                console.log("Socket Middleware");
                next()
            } catch (error) {
                console.log(error);
                return error;
            }
        })


        HTTPServer.io.on("connection", (socket: any) => {
            console.log("Connected: ");


            socket.on("disconnect", () => {
                console.log("Disconnected: ");
            });

            socket.on("chatroomMessage", async ({ message }: any) => {
                let s = HTTPServer.io.emit("newMessage", {
                    message,
                })
                if (s) {
                    HTTPServer.io.emit('Acknowledge', {
                        message: "Data Received"
                    })
                }
            }
            );
        });
    }
}












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