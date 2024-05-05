"use client"
import { useEffect, useRef } from "react"
import { Terminal } from "@xterm/xterm"
import "@xterm/xterm/css/xterm.css"
import { FitAddon } from "xterm-addon-fit";
import { useSocket } from "@/context/SocketContext";

const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
  cols: 40,
  rows: 40,
  theme: {
    background: "#333"
  }
};

export function TerminalWindow() {
  const { socket } = useSocket()
  const terminalRef = useRef<HTMLDivElement | null>(null)
  const fitaddon = new FitAddon()
  useEffect(() => {
    if (!terminalRef || !terminalRef.current) {
      return;
    }
    const term = new Terminal(OPTIONS_TERM)
    term.loadAddon(fitaddon)
    fitaddon.fit()
    term.open(terminalRef.current)

    socket?.on("output", (data) => {
      console.log("terminal data = ", data)
      term?.write(data)
    })

    term?.onData((e) => {
      socket?.emit("input", e)
    })

    return () => {
      term?.dispose()
    }
  }, [socket])

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto" ref={terminalRef}> </div>
  )
}