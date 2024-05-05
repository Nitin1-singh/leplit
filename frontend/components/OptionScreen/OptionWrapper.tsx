"use client"
import { generateRandomName } from "@/lib/genRandomName";
import Button from "../Buttons/Button";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";


export default function OptionWrapper() {
  const [loading, setLoading] = useState<boolean>(false)
  const randomName = generateRandomName()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined)
  const [disable, setDisable] = useState<boolean>(true)

  function handleClick() {
    setLoading(true)
    const name = inputRef.current?.value
    const data = { name: name, language: selectedOption }
    const res = axios.post(process.env.NEXT_PUBLIC_API as string + "/requirements", data)
    res.then((data) => {
      if (data.data == "ok") {
        setLoading(false)
        window.location.href = `/editor?replid=${name}&language=${selectedOption}`
      }
      setLoading(false)
    })
    res.catch((data) => setLoading(false))
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value == "") {
      setDisable(true)
    }
    else {
      setSelectedOption(e.target.value)
      setDisable(false)
    }
  }

  return (
    loading ? <p>loading...</p> :
      <div className="flex flex-col gap-5">
        <input className="text-black" ref={inputRef} value={randomName} placeholder={randomName} readOnly />
        <select className="text-black" id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="python">Python</option>
          <option value="nodejs">Node js</option>
        </select>
        <Button text="Replit" disable={disable} onClick={handleClick} />
      </div>
  )
}