import styled from 'styled-components';
import { useState, useEffect } from 'react';
const StyledSquare = styled.div`
width: ${props => props.width}px;
height: ${props => props.height}px;
background: ${props => props.isFood? "yellow": props.value ? "black": "blue"};
`;

const Square = (props) => {
    useEffect(()=> {
        console.log("apos rasdfasdf")
        
        
        return }, [props.value]
) 
    return (<StyledSquare value={props.value} isFood={props.isFood}> {props.isFood? "XXX": props.value ? "black": "blue"}</StyledSquare>)
}
export default Square