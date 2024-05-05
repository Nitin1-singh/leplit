const val = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

// Function to generate a random name
export function generateRandomName(len = 8) {
  let result = ""
  for (let i = 0; i < len; i++) {
    result += val.charAt(Math.floor(Math.random() * val.length));
  }
  return result;
}