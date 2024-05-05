import { readdir, Stats, statSync } from "fs"
import { copy, readFileSync, writeFile } from "fs-extra"

interface File {
  type: "file" | "dir";
  name: string;
}
// get all files and folder name and type
export const getAllFile = (replId: string): Promise<File[]> => {
  const dir = __dirname + `/user/${replId}`
  return new Promise((resolve, reject) => {
    readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.map(file => ({ type: file.isDirectory() ? "dir" : "file", name: file.name, path: `/user/${replId}/${file.name}` })));
      }
    });
  });
}
// get folder inside folder
export const getAllFileByPath = (path: string): Promise<File[]> => {
  const dir = __dirname + `${path}`
  return new Promise((resolve, reject) => {
    readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.map(file => ({ type: file.isDirectory() ? "dir" : "file", name: file.name, path: `${path}/${file.name}` })));
      }
    });
  });
}
// copy folder to another folder
export function copyFolder(language: string, replId: string) {
  copy(`${__dirname}/demo/${language}`, `${__dirname}/user/${replId}`, err => {
    return false
  })
  return true
}
// get content of file
export function fileContent(path: string) {
  const dir = __dirname + path
  const content = readFileSync(dir, "utf-8");
  return content
}
// save file content
export function fileSave(path: string, content: string) {
  writeFile(__dirname + path, content )
}