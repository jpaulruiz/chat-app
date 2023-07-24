import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import HttpRequest from "./HttpRequest";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: white;
    color: #020815;
    position: relative;
    `

const NullContainer = styled.div`
    display: flex;
    background-color: rgb(10,15,32);
    justify-content: center;
    align-items: center;
    flex: 1;

    span {
        font-size: 2rem;
        color: white;
    }
    `

const NullConvo = () => {
    return (
        <NullContainer>
            <span>Select a conversation . . .</span>
        </NullContainer>
    )
}

const LoadingConvo = () => {
    return (
        <NullContainer>
            <span>Loading . . .</span>
        </NullContainer>
    )
}

const ListConvo = ({params, data}) => {

    const [messageContent, setMessageContent] = useState('')

    const handleSend = () => {
        const cb = () => {
            setMessageContent('')
        }
    
        const data = {
            action: "send_conversation",
            data: {
                cuser: params.currentUser,
                cdata: params.data,
                cmessage: messageContent
            }
        }

        HttpRequest(data, cb);
    }

    return (
        <>
            <ChatHeader params={params}/>
            <Message data={data} userid={params.currentUser}/>
            <Input eventHandler={handleSend} data={messageContent} setContent={setMessageContent}/>
        </>
    )
}

const Load = ({params}) => {
    const [isLoading, setLoad] = useState(true)
    const [messageData, setMessageData] = useState([])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const cb = (e) => {
                setLoad(false)
                setMessageData(e.data)
            }
        
            const data = {
                action: "get_conversation",
                data: {
                    cuser: params.currentUser,
                    cdata: params.data
                }
            }
    
            HttpRequest(data, cb);
        }, 500)

        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
          };
        
    }, [params.data.username])

    return (
        <>
            {isLoading ? <LoadingConvo/> : <ListConvo data={messageData} params={params}/>}
        </>
    )
}

const Chat = ({params}) => {
    
    return (
        <Container>
            {params.data ? <Load params={params}/> : <NullConvo/>}
        </Container>
    );
}
 
export default Chat;