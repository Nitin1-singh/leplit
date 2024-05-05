"use client"
import { useFileContext } from '@/context/FileProvider';
import { useSocket } from '@/context/SocketContext';
import { textToIcon } from '@/lib/data';
import Editor from '@monaco-editor/react';
import Image from 'next/image';
import { useState } from 'react';

export function Writer() {
  const { fileData, fileName, path } = useFileContext()
  const [changeFile, setChangeFile] = useState("")
  const icon = textToIcon(fileName ? fileName : "")
  const { socket } = useSocket()

  const handleRun = () => {
    socket?.emit("file:run", { path: path, content: changeFile, language: fileName?.split(".")[1] })
  }
  const handelChange = (e: string | undefined) => {
    if (e) {
      setChangeFile(e)
    }
  }

  if (icon)
    return (
      <div className="basis-full flex flex-col">
        <div className="w-full flex flex-row justify-center bg-[#222]">
          <button onClick={handleRun} className="border border-white rounded-lg px-2 mt-2">Save & Run</button>
        </div>
        <div className={`flex bg-[#222] ${fileName ? "border-b-[0.1px] border-b-[#444]" : " "} pb-2`}>
          {
            fileName ?
              <div className="flex flex-row items-center border-t-[0.1px] border-slate-100">
                {icon == "📄" ? icon :
                  <Image className="ms-2" src={icon} width={18} height={18} alt="image" />
                }
                <p className="px-2">{fileName}</p>
              </div>
              : null
          }
        </div>
        <div className="h-full">
          <Editor onChange={handelChange} value={fileData ? fileData : ""} theme="vs-dark" defaultLanguage="javascript" defaultValue="" />
        </div>
      </div>
    )
}