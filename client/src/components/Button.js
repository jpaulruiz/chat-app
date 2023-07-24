import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
    color: ${({textColor}) => (textColor ? textColor: "inherit")};
    border-color: ${({borderColor}) => (borderColor ? borderColor: "inherit")};
    background-color: ${({backgroundColor}) => (backgroundColor ? backgroundColor: "inherit")};
    cursor: pointer;
    border-radius: 2px;
    border-width: 1px;
    border-style: ${({borderStyle}) => (borderStyle ? borderStyle: "solid")};
    height: ${({size}) => (size ? size: "inherit")};

    &:hover {
        border: 1px solid rgb(17, 23, 41);
        background-color: ${({backgroundHover}) => (backgroundHover ? backgroundHover: "white")};
        color: rgb(17, 23, 41);
    }
    `

const Button = ({size, eventHandler, backgroundHover, borderColor, borderStyle, backgroundColor, textColor, children}) => {
    return ( 
        <ButtonContainer
            backgroundHover={backgroundHover}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
            borderStyle={borderStyle}
            size={size}
            onClick={eventHandler}
            >
            {children}
        </ButtonContainer>
    );
}
 
export default Button;