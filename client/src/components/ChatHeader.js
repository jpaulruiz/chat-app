import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgb(11,14,27);
    color: white;
    padding: 1rem;
    width: 100%;

    .active-icon {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        padding-left: 8px;
    }

    span {
        padding-left: 8px;
    }
    `

const FontAwesomeStyled = styled(FontAwesomeIcon)`
    color: ${({active}) => active ? 'green' : 'gray'};
    font-size: 8px;
    `

const ChatHeader = ({params}) => {
    return ( 
        <Container>
            {params.data.username}
            <span>{params.activeText}</span>
            <div className="active-icon">
                <FontAwesomeStyled icon={faCircle} active={params.active}/>
            </div>
        </Container>
    );
}
 
export default ChatHeader;