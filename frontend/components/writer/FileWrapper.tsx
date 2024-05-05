"use client"
import { useEffect, useState } from "react";
import { Folder } from "./Folder";
import { useSocket } from "@/context/SocketContext";

export default function FileWrapper({ replid }: { replid: string | null }) {

  const [data, setData] = useState<[]>([])
  const { socket } = useSocket()

  useEffect(() => {
    socket?.emit("file", replid, (data: []) => {
      setData(data)
    })
    console.log("get data")
  }, [socket])

  return (
    <div className="basis-1/4 bg-[#232323]">
      {data.map((val) => (
        <Folder socket={socket} data={val} />
      ))}
    </div>
  )
}