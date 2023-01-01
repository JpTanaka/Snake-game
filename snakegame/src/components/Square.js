import styled from 'styled-components';
import { useState, useEffect } from 'react';
const StyledSquare = styled.div`
width: ${props => props.width}px;
height: ${props => props.height}px;
background: ${props => props.isFood? "yellow": props.value ? "green": "blue"};
`;

const Square = (props) => {
    useEffect(()=> {   
        return }, [props.value]
) 
    return (<StyledSquare value={props.value} isFood={props.isFood}> {props.value }</StyledSquare>)
}
export default Square