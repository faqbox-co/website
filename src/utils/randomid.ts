function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, "0");
}

export default function randomID() {
  const arr = new Uint8Array(10);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
