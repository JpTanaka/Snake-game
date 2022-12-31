import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from './Square'
import {board} from '../constants/board.js'


const StyledBoard = styled.div`
    width: ${props => props.width+100}px;
    height: ${props => props.height}px;
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, ${props => props.width/props.cols}px);
    grid-template-rows: repeat(${props => props.rows}, ${props => props.height/props.rows}px);
    background: gray;
    row-gap: 2px;
    column-gap: 2px
`;



const Board = (props) => {
    const [head, setHead] = useState([Math.floor(board.ROWS/2), Math.floor(board.COLS/2)])
    const [tail, setTail] = useState(head)
    const [food, setFood] = useState([10, 15])
    const [game, setGame] = useState("lost")
    const [move, setMove] = useState('ArrowLeft')
    const blankMatrix = Array(board.ROWS).fill().map(() => Array(board.COLS).fill(0));
    const moves = {"ArrowLeft":1 , "ArrowRight":2, "ArrowUp":3, "ArrowDown":4}
    const [matrix, setMatrix] = useState(blankMatrix)
    useEffect(()=> {
            if (game==="start") {
                startGame()
            }
            if (game==="game") {
                const interval = setInterval(() => {
                refreshBoard(head, matrix);
            }, 500)  
            
            
            return () => clearInterval(interval)}}, [game]
    )
    function startGame() {
        let startBoard = blankMatrix
        startBoard[head[0]][head[1]]=1
        setMatrix(startBoard)
        generateFood()
        setGame("game")
    }
    function generateFood() {
        setFood([Math.floor(Math.random()*board.ROWS), Math.floor(Math.random()*board.COLS)])
    }
    function toggleGame() {
        setGame(game==="lost"? "start": game==="game"? "pause": "game")
    }
    function handleKeyBoard(event) {
        console.log(move)
        setMove(event.code)
    }
    function refreshBoard(head, matrix) {
        nextBoard()
    }
    function checkMoveTail() {
        return !(head[0]===food[0] && head[1]===food[1])
    }
    function checkMoveHead() {
        console.log(checkCollision(nextStep(move, head)))
        return checkCollision(nextStep(move, head))
    }
    function checkCollision(){
        return (matrix[head[0]][head[1]] !==0 || !(0<=head[0]<=board.ROWS) ||  !(0<=head[1]<=board.COLS))
    }
    function nextStep(move, entity) {
        switch(move) {
            case "ArrowLeft":
                return [entity[0], entity[1]-1]
            case "ArrowRight":
                return [entity[0], entity[1]+1]
            case "ArrowUp":
                return [entity[0]-1, entity[1]]
            case "ArrowDown":
                return [entity[0]+1, entity[1]]
            default:
                break
        }
    }
    function update(move, entity, setEntity) {
        setEntity(nextStep(entity))
    } 
    function nextBoard() {
        const newMatrix = matrix
        console.log("tail", tail)
        if (checkMoveTail) {
            newMatrix[tail[0]][tail[1]] = 0
            console.log(matrix, matrix[tail[0]][tail[1]],Object.keys(moves).find(key => moves[key] === matrix[tail[0]][tail[1]]))
            update(Object.keys(moves).find(key => moves[key] === matrix[tail[0]][tail[1]]), tail, setTail)
            console.log("tail apos", tail)
        }
        if (checkMoveHead()) {
            setGame("lost")
            return
        }
        update(move, head, setHead)
        newMatrix[head[0]][head[1]] = moves[move]
        setMatrix([...newMatrix])
    }
    return (<>
            <StyledBoard tabIndex={-1} onKeyDown={(e) => handleKeyBoard(e)} width={board.WIDTH} height={board.HEIGHT} rows={board.ROWS} cols={board.COLS} >
                        { matrix.map((row, rowindex) => row.map((item, colindex) => <Square key={rowindex*100+colindex} isFood={rowindex===food[0] && colindex===food[1]} value={matrix[rowindex][colindex]}>{[rowindex, colindex]}</Square>))}
                    </StyledBoard >
            <button onClick={() => toggleGame()}> Game </button>
    </>
            

    )
}

export default Board;