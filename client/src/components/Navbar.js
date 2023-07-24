import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HttpRequest from "./HttpRequest";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: lightpink;
    padding: 4px;
    `

const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex: 1;

    span {
        margin-right: 4px;
    }
    `

const Navbar = (props) => {

    const navigate = useNavigate()

    const HandleClick = () => {
        const data = {
            action: "logout",
            data: {
                cuser: props.userId
            }
        }

        HttpRequest(data,null)
        localStorage.clear()
        navigate("/login")
    }

    return (
        <Container>
            <strong>CHAT APP</strong>
            <UserContainer>
                <span>{props.userId}</span>
                <Button borderStyle={"none"} backgroundColor={"rgb(17, 23, 41)"} textColor={"white"}
                    eventHandler={HandleClick}>Logout</Button>
            </UserContainer>
        </Container>
    );
}
 
export default Navbar;