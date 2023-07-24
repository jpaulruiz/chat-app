import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Contact from "./Contact";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.4;
    background-color: #020815;
    color: white;
    `


const Sidebar = ({userId,setSelectedConvo}) => {
    return (
        <Container>
            <Navbar userId={userId}/>
            <Contact userId={userId} setSelectedConvo={setSelectedConvo}/>
        </Container>
    );
}
 
export default Sidebar;