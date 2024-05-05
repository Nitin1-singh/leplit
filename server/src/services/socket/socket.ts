import { Server as server1, IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { Terminal } from "../terminal/terminal";
import { fileContent, fileSave, getAllFile, getAllFileByPath } from "../../lib/folder";

export class Socket {
  constructor(serverArg: server1<typeof IncomingMessage, typeof ServerResponse>) {
    const socket = new Server(serverArg, { cors: { origin: "*" } })

    socket.on("connection", (socket) => {
      const { term } = new Terminal(socket.handshake.query.repid as string)
      console.log("socket = ", socket.id)

      term?.onData((data) => {
        socket.emit("output", data);
      })

      socket.on("file", async (data, callback) => {
        const res = await getAllFile(data)
        callback(res)
      })

      socket.on("file:path", async (data, callback) => {
        const res = await getAllFileByPath(data)
        callback(res)
      })

      socket.on("file:content", async (data, callback) => {
        const res = fileContent(data)
        callback(res)
      })

      socket.on("file:run", ({ path, content, language }) => {
        if (language == "py") {
          fileSave(path, content)
          term?.write("python3 main.py" + "\r")
          return
        }
        if (language = "js") {
          fileSave(path, content)
          term?.write("node index.js" + "\r")
          return
        }
      })

      socket.on("input", (data) => {
        term?.write(data)
      })

      term?.onExit(({ exitCode, signal }) => {
        console.log(`Shell exited with code ${exitCode} and signal ${signal}`);
        socket.disconnect(true);
      })

      socket.on("disconnect", () => {
        console.log("socket disconnect ")
        term?.kill()
      })
    });
  }
}