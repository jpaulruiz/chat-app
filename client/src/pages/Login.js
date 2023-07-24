import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import HttpRequest from "../components/HttpRequest";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgb(17, 23, 41);
    height: 100vh;
    `

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            padding: 2px;
            border: none;
            border-bottom: 2px solid rgb(17, 23, 41);
            outline: none;
        }
    }

    p {
        font-size: 0.8rem;
    }
    `

const StyledLink = styled(Link)`
    color: inherit;
    font-weight: bold;

    &:hover {
        color: lightpink;
    }
    `

const Login = ({children}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) navigate("/")
    }, [])

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        const form = document.querySelector('.login')
        const formData = new FormData(form)

        const data = {
            action: 'login',
            data: Object.fromEntries(formData.entries())
        }

        const callbackFn = (e) => {
            if (!e.success) setErrorMessage(e.message)
            else {
                localStorage.setItem('isLoggedIn',true)
                children.setLoggedIn(localStorage.getItem('isLoggedIn'))
                children.setData(() => {
                    return {userId: e.data}
                })
                navigate("/")
            }
        }

        HttpRequest(data,callbackFn)
    }

    return (
        <Container>
            <Wrapper>
                <h2>Chat App</h2>
                <form onSubmit={handleSubmit} className="login">
                    <input type="text" name="cuser" placeholder="Username" required/>
                    <input type="password" name="cpassword" placeholder="Password" required/>
                    <Button backgroundHover={"lightpink"} borderStyle={"none"} backgroundColor={"rgb(17, 23, 41)"} textColor={"white"}>LOGIN</Button>
                </form>
                {errorMessage && 
                    <p style={{color: "red"}}>
                        {errorMessage}
                    </p>
                }
                <p>No account yet? <StyledLink to="/signup">Register now.</StyledLink></p>
            </Wrapper>
        </Container>
    );
}
 
export default Login;