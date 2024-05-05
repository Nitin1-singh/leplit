"use client"
import { TerminalWindow } from "@/components/terminal/Terminal";
import { Writer } from "@/components/writer/Writer";
import { useSearchParams } from "next/navigation";
import FileWrapper from "./writer/FileWrapper";
import { SocketProvider } from "@/context/SocketContext";


export function WrapperEditor() {
  const param = useSearchParams()
  const replid = param.get("replid")

  return (
    <SocketProvider rep={replid}>
      <main className="h-screen flex flex-row">
        <FileWrapper replid={replid} />
        <Writer />
        <div className="basis-1/2">
          <TerminalWindow />
        </div>
      </main>
    </SocketProvider>
  )
}