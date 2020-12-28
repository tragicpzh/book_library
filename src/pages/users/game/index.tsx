import React, {useEffect, useState} from "react";
import { startWith, withLatestFrom ,map} from 'rxjs/operators';
import {p1Ope, p2Ope, gameSize, empty, dirToPaint, initGamePaint, dirDiff} from './constant';
import {useEventCallback}from 'rxjs-hooks';
import styles from './index.less'
import { interval, Observable ,combineLatest} from "rxjs";
const shotsChange=(item)=>{
  const preX=item.x;
  const preY=item.y;
  switch (item.direction){
    case 'up':
      item.y=dirDiff.up(item.y);
      break;
    case 'left':
      item.x=dirDiff.left(item.x);
      break;
    case 'down':
      item.y=dirDiff.down(item.y);
      break;
    case 'right':
      item.x=dirDiff.right(item.x);
      break;
  }
  if(preX===item.x&&preY===item.y){
    return false;
  }
  else {
    return item;
  }
}
const Index=()=>{
  const [keyDown,gameState]=useEventCallback(
    (event$:Observable<any>,state$:Observable<any>)=>{
      return (
        combineLatest(interval(200),event$.pipe(startWith({key:''})))
          .pipe(
            withLatestFrom(state$),
            map(item=>{
              const key=item[0][1].key;
              const {shots,player1,player2}=item[1];
              let newPlayer1={...player1};
              switch(key){
                case p1Ope.up:
                  newPlayer1.direction='up';
                  newPlayer1.y=dirDiff.up(newPlayer1.y);
                  break;
                case p1Ope.left:
                  newPlayer1.direction='left';
                  newPlayer1.x=dirDiff.left(newPlayer1.x);
                  break;
                case p1Ope.down:
                  newPlayer1.direction='down';
                  newPlayer1.y=dirDiff.down(newPlayer1.y);
                  break;
                case p1Ope.right:
                  newPlayer1.direction='right';
                  newPlayer1.x=dirDiff.right(newPlayer1.x);
                  break;
                case p1Ope.shot:
                  shots.push({...newPlayer1});
                  break;
                default:
                  break;
              }
              let newPlayer2={...player2};
              switch(key){
                case p2Ope.up:
                  newPlayer2.direction='up';
                  newPlayer2.y=dirDiff.up(newPlayer2.y);
                  break;
                case p2Ope.left:
                  newPlayer2.direction='left';
                  newPlayer2.x=dirDiff.left(newPlayer2.x);
                  break;
                case p2Ope.down:
                  newPlayer2.direction='down';
                  newPlayer2.y=dirDiff.down(newPlayer2.y);
                  break;
                case p2Ope.right:
                  newPlayer2.direction='right';
                  newPlayer2.x=dirDiff.right(newPlayer2.x);
                  break;
                case p2Ope.shot:
                  shots.push({...newPlayer2});
                  break;
                default:
                  break;
              }
              let newShots=[];
              shots.forEach(item=>{
                item=shotsChange(item);
                if(item){
                  if(item.x===newPlayer1.x&&item.y===newPlayer1.y){
                    newPlayer2.score+=1;
                  }
                  else if(item.x===newPlayer2.x&&item.y===newPlayer2.y){
                    newPlayer1.score+=1;
                  }
                  else {
                    newShots.push(item);
                  }
                };
              })
              return {
                shots:newShots,
                player1: newPlayer1,
                player2: newPlayer2
              };
            })
          )

      )
    }
    ,initGamePaint
  );
  const [p1Score,setP1Score]=useState(0);
  const [p2Score,setP2Score]=useState(0);
  const [gamePaint,setPaint]=useState(null);

  useEffect(()=>{
    document.addEventListener('keydown',keyDown);
  },[keyDown])

  useEffect(()=>{
    const {player1,player2,shots}=gameState
    setP1Score(player1.score);
    setP2Score(player2.score);
    const newGamePaint=initGame(gameSize);
    newGamePaint[player1.y][player1.x]={paint:dirToPaint[player1.direction],color:player1.color};
    newGamePaint[player2.y][player2.x]={paint:dirToPaint[player2.direction],color:player2.color};
    shots.forEach(item=>{
      newGamePaint[item.y][item.x]={paint:dirToPaint['shot'],color:item.color};
    })
    setPaint(newGamePaint)
  },[gameState])

  const initGame=(size)=>{
    return new Array(size).fill(empty).map(_=>new Array(gameSize).fill(empty));
  }

  return (
    <div style={{display:"flex"}}>
      <div>
        {
          gamePaint?.map(row=>(
            <div style={{display:"flex",flexDirection:"row"}}>
              {row.map(element=>(
                <div className={styles.element} style={{color:element.color}}>{element.paint==='0'?'':element.paint}</div>
              ))}
            </div>
          ))
        }
      </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",marginLeft:20}}>
        <div style={{border:'1px solid black'}}>
          <div className={styles.score1}>
            {`player1:${p1Score}`}
          </div>
          <div className={styles.score2}>
            {`player2:${p2Score}`}
          </div>
        </div>
        <div style={{border:'1px solid black'}}>
          <div className={styles.player1}>
            {`player1:${p1Ope.up}${p1Ope.left}${p1Ope.down}${p1Ope.right}  ${p1Ope.shot}`}
          </div>
          <div className={styles.player2}>
            {`player2:${p2Ope.up}${p2Ope.left}${p2Ope.down}${p2Ope.right}  ${p2Ope.shot}`}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index;
