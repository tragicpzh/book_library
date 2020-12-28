export function generateUUID() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const v = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? v : (v & 0x3 | 0x8)).toString(16);
  });
}

export function deepEqual(a,b){
  return JSON.stringify(a)===JSON.stringify(b)
}
