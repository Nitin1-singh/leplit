"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useFileContext } from "./FileProvider";
interface socketContextProps {
  socket: Socket | null
}

const socketContext = createContext<socketContextProps>({ socket: null })

export const SocketProvider = ({ children, rep }: { children: ReactNode, rep?: string | null }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    if (socket) return
    const soc = io(process.env.NEXT_PUBLIC_API as string, { query: { repid: rep } })
    setSocket(soc)
    return () => {
      soc.on("disconnect", (socket) => console.log("disconnect", socket))
      setSocket(null)
    }
  }, [])

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(socketContext)
}