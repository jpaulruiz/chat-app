import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { Link } from "react-router-dom";
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
    max-width: 250px;

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

        input[type="file"] {
            border: none;
        }
    }

    strong {
        padding: 1rem;
    }

    h2 {
        margin-bottom: 0;
    }

    p {
        font-size: 0.8rem;
    }

    label {
        font-size: 0.8rem;
        margin-left: 2px;
    }
    `

const StyledLink = styled(Link)`
    color: inherit;
    font-weight: bold;

    &:hover {
        color: lightpink;
    }
    `

const Signup = () => {

    const [userName,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const [success,setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setSuccess('')

        if (!userName || !email || !password) {
            setErrorMessage('Please fill-out all the fields.')
            return
        }

        const form = document.querySelector('.signup')
        const formData = new FormData(form)
        
        const data = {
            action: 'signup',
            data: Object.fromEntries(formData.entries())
        }

        const callbackFn = (e) => {
            e.success ? setSuccess(e.message) : setErrorMessage(e.message)
        }

        HttpRequest(data,callbackFn)
    }

    return (
        <Container>
            <Wrapper>
                <h2>Chat App</h2>
                <strong>REGISTER</strong>
                <form onSubmit={handleSubmit} className="signup" enctype="multipart/form-data">
                    <input name="cuser" 
                            type="text" 
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)}
                            required/>
                    <input name="cemail"
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                    <input  name="cpassword"
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                    <div>
                        <label>Select Image</label>
                        <input  name="cfile"
                            type="file"
                            // onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>
                    <Button backgroundHover={"lightpink"} 
                        borderStyle={"none"} 
                        backgroundColor={"rgb(17, 23, 41)"} 
                        textColor={"white"}>
                            SIGN UP
                    </Button>
                </form>
                {success &&
                    <p style={{fontWeight: "bold"}}>
                        {success}
                    </p>
                }
                {errorMessage && 
                    <p style={{color: "red"}}>
                        {errorMessage}
                    </p>
                }
                <p>Already have an account? Login <StyledLink to="/login">here.</StyledLink></p>
            </Wrapper>
        </Container>
    );
}
 
export default Signup;