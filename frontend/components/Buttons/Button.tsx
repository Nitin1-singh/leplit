"use client"
interface propsI {
  text?: string
  onClick?: () => void
  disable: boolean
}
export default function Button(props: propsI) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  }
  return (
    <button disabled={props.disable} className={`bg-red-600`} onClick={handleClick}>{props.text}</button>
  )
}