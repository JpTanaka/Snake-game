import styled from 'styled-components';
const StyledSquare = styled.div`
width: ${props => props.width}px;
height: ${props => props.height}px;
background: ${props => props.value ? "black": "blue"};
`;

const Square = (props) => {
    console.log(props.value)
    
    return (<StyledSquare value={props.value}>{props.value ? "white": "blue"}</StyledSquare>)
}
export default Square