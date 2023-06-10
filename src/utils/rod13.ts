export default function rod13(val: string | String) {
  let res = "";

  for (let i = 0; i < val.length; i++) {
    let char = val[i];
    let o = char.charCodeAt(0);

    // Char is not a-z nor A-Z
    if (char.toLowerCase() == char.toUpperCase()) {
      // Just add the char
      res += char;
      continue;
    }

    if ((o >= 65 && o <= 77) || (o >= 97 && o <= 109)) {
      res += String.fromCharCode(o + 13);
    } else res += String.fromCharCode(o - 13);
  }

  return res;
}
