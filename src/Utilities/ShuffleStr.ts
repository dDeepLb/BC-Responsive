export function ShuffleStr(src: string[]) {
  let temp: string[] = JSON.parse(JSON.stringify(src));
  let ret: string[] = [];
  while (temp.length > 0) {
    let d = Math.floor(Math.random() * temp.length);
    ret.push(temp[d]);
    temp.splice(d, 1);
  }
  return ret;
}
