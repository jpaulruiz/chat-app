import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(11,14,27);
    flex: 0.1;
    padding-left: 8px;
    padding-right: 8px;
    position: absolute;
    bottom: 0;
    width: 100%;

    input {
        outline: none;
        border: 1px solid rgb(11,14,27);
        flex: 0.8;
        flex-grow: 0.95;
        height: 3rem;
    }
    `

const Input = ({eventHandler, setContent, data}) => {

    return (
        <Container>
                <input type="text" placeholder="Enter message..."  value={data}
                    onChange={(e) => setContent(e.target.value)}></input>
                <Button size={"3rem"} backgroundHover={"lightpink"} borderStyle={"none"} backgroundColor={"rgb(17, 23, 41)"} textColor={"white"}
                    eventHandler={eventHandler}>SEND</Button>
        </Container>
    );
}
 
export default Input;