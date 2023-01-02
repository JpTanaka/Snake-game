import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Square from './Square'
import { board } from '../constants/board.js'


const StyledBoard = styled.div`
    width: ${props => props.width + 100}px;
    height: ${props => props.height}px;
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, ${props => props.width / props.cols}px);
    grid-template-rows: repeat(${props => props.rows}, ${props => props.height / props.rows}px);
    background: gray;
    row-gap: 2px;
    column-gap: 2px
`;



const Board = (props) => {
    const [head, setHead] = useState([Math.floor(board.ROWS / 2), Math.floor(board.COLS / 2)])
    const [tail, setTail] = useState(head)
    const prevTail = usePrevious(tail)
    const prevHead = usePrevious(head)
    const [count, setCount] = useState(0)
    const [food, setFood] = useState([10, 15])
    const [game, setGame] = useState("lost")
    const [move, setMove] = useState('ArrowLeft')
    const blankMatrix = Array(board.ROWS).fill().map(() => Array(board.COLS).fill(0));
    const moves = { "ArrowLeft": 1, "ArrowRight": 2, "ArrowUp": 3, "ArrowDown": 4, "None": 0 }
    const [matrix, setMatrix] = useState(blankMatrix)
    useEffect(() => {
        if (game === "start") {
            startGame()
        }
        if (game === "game") {
            const interval = setInterval(() => {
                nextBoard()
                // setCount(count => count + 1);
            }, 500)
            return () => clearInterval(interval)
        }
    }, [game]
    )

    // useEffect(() => {
    //     if (game === "game") 
    // }, [count])

    useEffect(() => {
        setMatrix(curMatrix => {
            const newMatrix = curMatrix
            if (!foodIsEaten() && prevTail) {
                let newTail = null
                const moveTail = Object.keys(moves).find(key => moves[key] === matrix[tail[0]][tail[1]])
                if (moveTail!=="None") newTail = nextStep(moveTail, tail, "tail")
                if (!newTail || (newTail[0]!== prevTail[0] || newTail[1]!==prevTail[1])) newMatrix[prevTail[0]][prevTail[1]] = 0
            }
            else if (foodIsEaten()) {
                setTail([...prevTail])
                generateFood()
            }
            newMatrix[head[0]][head[1]] = moves[move]
            return [...newMatrix]
        })
    }, [head, tail]
    )
    useEffect(() => {
        if (matrix) {
            setMatrix(curMatrix => {
                const newMatrix = curMatrix
                newMatrix[head[0]][head[1]] = moves[move]
                return [...newMatrix]
            })
        }

}, [move]
    )
    function nextBoard() {
        if (!foodIsEaten() && tail) {
            let moveTail = Object.keys(moves).find(key => moves[key] === matrix[tail[0]][tail[1]])
            if (head[0] === tail[0] && head[1] === tail[1]) moveTail = move
            const newTail = nextStep(moveTail, tail, "tail")
            setTail([...newTail])
        }
        if (checkHeadCollision(head)) {
            setGame("lost")
            return
        }
        const nextHead = nextStep(move, head, "head")
        setHead([...nextHead])
    }
    function foodIsEaten() {
        return head[0] === food[0] && head[1] === food[1]
    }
    function checkHeadCollision(head) {
        // returns True if collision
        return checkCollision(nextStep(move, head, "head"))
    }
    function checkCollision(point) {
        return (matrix[point[0]][point[1]] !== 0 || !(0 <= point[0] <= board.ROWS) || !(0 <= point[1] <= board.COLS))
    }
    function nextStep(move, entity, nameEntity = "") {
        switch (move) {
            case "ArrowLeft":
                return [entity[0], entity[1] - 1]
            case "ArrowRight":
                return [entity[0], entity[1] + 1]
            case "ArrowUp":
                return [entity[0] - 1, entity[1]]
            case "ArrowDown":
                return [entity[0] + 1, entity[1]]
            default:
                throw new Error(`Move doesn't exists: ${move} for entity ${nameEntity}, ${entity}`)
        }
    }
    function startGame() {
        let startBoard = blankMatrix
        startBoard[head[0]][head[1]] = moves[move]
        setMatrix(startBoard)
        generateFood()
        setGame("game")
    }

    function generateFood() {
        console.log("generate food")
        setFood([Math.floor(Math.random() * board.ROWS), Math.floor(Math.random() * board.COLS)])
    }
    function toggleGame() {
        setGame(game === "lost" ? "start" : game === "game" ? "pause" : "game")
    }
    function handleKeyBoard(event) {
        if (Object.keys(moves).includes(event.code)) setMove(event.code)
    }
    return (<>
        <div> Head {head} Tail {tail} Food {food} </div>
        <StyledBoard tabIndex={-1} onKeyDown={(e) => handleKeyBoard(e)} width={board.WIDTH} height={board.HEIGHT} rows={board.ROWS} cols={board.COLS} >
            {matrix.map((row, rowindex) => row.map((item, colindex) => <Square key={rowindex * 100 + colindex} isFood={rowindex === food[0] && colindex === food[1]} value={matrix[rowindex][colindex]}>{[rowindex, colindex]}</Square>))}
        </StyledBoard >
        <button onClick={() => toggleGame()}> Game </button>
    </>
    )
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value; //assign the value of ref to the argument
        }, [value]); //this code will run when the value of 'value' changes
        return ref.current; //in the end, return the current ref value.
    }
}

export default Board;