export interface explorerI {
  type: string,
  name: string,
  path: string,
}


export const textToIcon = (filename: string): string => {
  const file_last = filename.split(".")[1]
  if (!file_last) return "📄"
  else {
    const obj = { "js": "/js.svg", "ts": "/ts.svg", "json": "/node.svg", "html": "/html.svg", "py": "/py.svg", "css": "/css.svg" }
    if (file_last in obj) {
      return obj[file_last]
    }
    return "📄"
  }
}
