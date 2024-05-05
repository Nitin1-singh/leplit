import { IPty, spawn } from "node-pty"

export class Terminal {
  public term: IPty | null = null;
  constructor(path: string) {
    // Create a new pseudo-terminal
    const term = spawn("bash", [], {
      name: "xterm-color",
      cols: 40,
      cwd: "/home/mint/Documents/leplit/server/dist/lib/user/" + path,
      env: process.env
    });
    this.term = term
  }
}


