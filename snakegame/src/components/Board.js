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
    const [move, setMove] = useState('ArrowLeft')
    const blankMatrix = Array(board.ROWS).fill().map(() => Array(board.COLS).fill(0));
    blankMatrix[2][0] = 1
    const [matrix, setMatrix] = useState(blankMatrix)
    let items = null
    if (matrix) {
        items = matrix.map((row, rowindex) => row.map((item, colindex) => <Square key={rowindex*100+colindex} value={matrix[rowindex][colindex]}>{[rowindex, colindex]}</Square>))
    }
    useEffect(()=> {
            if (true) {
                const interval = setInterval(() => {
                refreshBoard(head, matrix);
                console.log("apos refreshBoard", matrix)
            }, 500)  
            
            
            return () => clearInterval(interval);}}
    )
    function handleKeyBoard(event) {
        console.log(move)
        setMove(event.code)
    }
    function refreshBoard(head, matrix) {
        const moves = {1: "ArrowLeft", 2:"ArrowRight", 3:"ArrowUp", 4:"ArrowDown"}
        nextBoard(matrix, head)
    }
    function nextBoard(matrix, head) {
        console.log(matrix, head)
        const newArray = head
        newArray[1] -=1
        setHead(newArray)
        const newMatrix = matrix
        newMatrix[head[0]][head[1]-1] = 1
        console.log(newMatrix)
        setMatrix(newMatrix)
    }
    return (
            <StyledBoard tabIndex={-1} onKeyDown={(e) => handleKeyBoard(e)} width={board.WIDTH} height={board.HEIGHT} rows={board.ROWS} cols={board.COLS} >
                {items}
            </StyledBoard >
        
    )
}

export default Board;