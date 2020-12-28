export const p1Ope={
  up:'w',
  down:'s',
  left:'a',
  right:'d',
  shot:'c'
}
export const p2Ope={
  up:'i',
  down:'k',
  left:'j',
  right:'l',
  shot:'n'
}
export const gameSize=15;
export const empty='0';
export const dirToPaint={
  up:'^',
  down:'v',
  left:'<',
  right:'>',
  shot:'*'
}
export const initGamePaint={
  shots:[],
  player1:{
    x:0,
    y:0,
    direction:'down',
    score:0,
    color:'green'
  },
  player2:{
    x:gameSize-1,
    y:gameSize-1,
    direction:'up',
    score:0,
    color:'blue'
  }
}
export const dirDiff= {
  'up': item => Math.max(item - 1, 0),
  'left': item => Math.max(item - 1, 0),
  'down': item => Math.min(item + 1, gameSize - 1),
  'right': item => Math.min(item + 1, gameSize - 1),
}

