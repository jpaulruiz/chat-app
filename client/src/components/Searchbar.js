import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
        display: flex;
        margin: 4px;

        input {
            outline: none;
            flex-grow: 1;
        }
    `

const Searchbar = (props) => {
    return (
        <Container>
            <input type="text" placeholder="Search contact..." onChange={(e) => {
                props.setSearch(e.target.value)
            }}></input>
            <button onClick={props.handleSearch}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
        </Container>
    )
}

export default Searchbar;