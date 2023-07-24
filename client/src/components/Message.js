import React from "react";
import styled from "styled-components";
import defaultImage from "../assets/default-avatar.png";
import ScrollToBottom from "react-scroll-to-bottom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    flex: 0.9;
    overflow: scroll;
    overflow-x: hidden;
    `

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${({Owner}) => (Owner ? "row-reverse" : "row")};
    padding: 4px;

    img {
        width: 2rem;
        height: 2rem;
    }

    span {
        color: gray;
        font-size: 0.7rem;
    }

    p {
        ${({Owner}) => (Owner ? "margin-right: 8px" : "margin-left: 8px")};
        background-color:${({Owner}) => (Owner ? "rgb(17, 23, 41)" : "lightpink")};
        color: ${({Owner}) => (Owner ? "white" : "rgb(17, 23, 41)")};
        padding: 4px;
        font-size: 0.9rem;
        ${({Owner}) => (Owner ? "border-radius: 4px 0 4px 4px" : "border-radius: 0 4px 4px 4px")};
    }

    `

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

const DisplayMessages = ({data, userid}) => {
    if (!data) return
    return ( 
        data.map((message,key) => {
            const owner = message.message_sender === userid ? true : false
            return (
                <Wrapper Owner={owner} key={key}>
                    <ImageContainer>
                        <img src={defaultImage} alt="Default"/>
                    </ImageContainer>
                    <div>
                        <p>{message.message_content}</p>
                    </div>
                </Wrapper>
            )
        })
    )
}

const Message = ({data, userid}) => {
    return (
        <Container>
            <ScrollToBottom>
                <DisplayMessages data={data} userid={userid}/>
            </ScrollToBottom>
        </Container>
    );
}
 
export default Message;