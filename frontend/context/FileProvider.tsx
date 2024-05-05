"use client"
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
interface contextType {
  path: string | null,
  setPath: Dispatch<SetStateAction<string | null>> | null
  fileData: string | null,
  fileName: string | null,
  setFileData: Dispatch<SetStateAction<string | null>> | null
  setFileName: Dispatch<SetStateAction<string | null>> | null
}

interface providerType {
  children: ReactNode
}

export const FileContext = createContext<contextType>({ fileData: null, setFileData: null, fileName: null, setFileName: null, path: null, setPath: null })

export const FileContextProvider = ({ children }: providerType) => {
  const [fileData, setFileData] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [path, setPath] = useState<string | null>(null)


  return (
    <FileContext.Provider value={{ fileData, setFileData, fileName, setFileName, path, setPath }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFileContext = () => {
  return useContext(FileContext)
}