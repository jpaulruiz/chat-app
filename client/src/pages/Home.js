import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

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
    flex-direction: row;
    width: 60vw;
    height: 80vh;
    border-radius: 1rem;
    overflow: hidden;
    `

const Home = ({children}) => {

    const [selectedConvo, setSelectedConvo] = useState({})

    return (
        <Container>
            <Wrapper>
                <Sidebar userId={children.data.userId} setSelectedConvo={setSelectedConvo}/>
                <Chat params={selectedConvo}/>
            </Wrapper>
        </Container>
    );
}
 
export default Home;