"use client"
import { useFileContext } from "@/context/FileProvider";
import { explorerI, textToIcon } from "@/lib/data";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { Socket } from "socket.io-client";

interface props {
  data: explorerI
  socket: Socket | null
}

export function Folder({ data, socket }: props) {
  const [expand, setExpand] = useState(false)
  const [filePath, setFilePath] = useState<string | null>(null)
  const [folderData, setFolderData] = useState<explorerI[]>([])
  const { setFileName, setFileData, setPath } = useFileContext()

  if (expand) {
    socket?.emit("file:path", filePath, (data: []) => {
      setFolderData(data)
    })
  }

  const handleClickFolder: MouseEventHandler<HTMLSpanElement> = (e) => {
    setExpand((exp) => !exp)
    setFilePath(e.currentTarget.id)
  }

  const handleFileClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    socket?.emit("file:content", e.currentTarget.id, (data: string) => {
      if (setFileData != null) {
        setFileData(data)
      }
    })
    if (setFileName)
      setFileName(e.currentTarget.id.split("/").slice(-1)[0])
    if (setPath)
      setPath(e.currentTarget.id)
  }

  if (data.type == "dir") {
    return (
      <div>
        <div className="ps-2">
          <div className="file ps-2">
            <span
              id={data.path}
              onClick={handleClickFolder}
            >
              {expand ? `📂 ${data.name}` : `📁 ${data.name}`}
            </span>
          </div>
          <div>
            {expand ?
              folderData.map((val) => (
                <Folder data={val} socket={socket} />
              ))
              : null
            }
          </div>
        </div>
      </div>
    )
  }
  else {
    const ans = textToIcon(data.name)
    if (ans.includes("/")) {
      return (
        <div className="flex flex-row ms-2 ps-2 items-center file">
          <Image src={ans} width={15} height={15} alt="image" />
          <span onClick={handleFileClick} id={data.path} className="ps-2">{data.name}</span>
        </div>
      )
    }
    return (
      <span id={data.path} onClick={handleFileClick}
        className="file ps-4" >📄 {data.name}</span >
    )
  }
}