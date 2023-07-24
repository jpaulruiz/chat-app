import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImage from "../assets/default-avatar.png";
import Searchbar from "./Searchbar";
import HttpRequest from "./HttpRequest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    `

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    border-bottom: 1px solid gray;
    flex: 1;

    span {
        padding-left: 8px;
        font-weight: bold;
    }

    p {
        padding-left: 8px;
        margin: 0;
        font-size: 0.8rem;
        color: gray;
    }

    img {
        width: 2rem;
        height: 2rem;
    }

    &:hover {
        background-color: rgb(10,15,32);
    }

    .active-icon {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        padding-right: 8px;
    }
    `

const ContactDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    `

const ContactWrapper = styled.div`
    overflow: auto;
    overflow-x: hidden;
    `

const FontAwesomeStyled = styled(FontAwesomeIcon)`
    color: ${({activeColor}) => activeColor ? 'green' : 'gray'};
    font-size: 8px;
    `

const ContactList = ({searchId, userId, setSelectedConvo}) => {
    return searchId.map((chat, i) => {

        const activeColor = Number(chat['active'])
        const activeText = activeColor ? "(Online)" : ""
        
        const handleContact = () => {
            setSelectedConvo({
                data: chat,
                active: activeColor,
                activeText: activeText,
                currentUser: userId
            })
        }

        return (
            <Wrapper key={i} onClick={handleContact}>
                <div>
                    <img src={defaultImage} alt="Default"/>
                </div>
                <ContactDetail>
                    <span>{chat['username']} 
                        <span style={{fontSize:"10px", fontWeight:"500", color:"gray"}}>
                            {activeText}
                        </span>
                    </span>
                    <p>{chat['email']}</p>
                </ContactDetail>
                <div className="active-icon">
                    <FontAwesomeStyled icon={faCircle} activeColor={activeColor}/>
                </div>
            </Wrapper>
        )
    })
}

const Contact = ({userId, setSelectedConvo}) => {

    const [searchContact, setSearchContact] = useState('')
    const [filteredContact, setFilterContact] = useState([])
    const contacts = useRef()
    const intervalFlag = useRef(true)

    const intervalFn = () => {
        const cb = (e) => {
            contacts.current = e.data
            contacts.current = contacts.current.filter((contact) => {
                if (contact['username'] !== userId) return true
                return false
            })
            setFilterContact(contacts.current);
        };
        
        const data = {
            action: "contact_list",
            data: {
                clist: true
            }
        };
        
            HttpRequest(data, cb);
    }

    const handleSearch = () => {
        //filter the contact list
        if (!searchContact) {
            setInterval(intervalFn, 500)
            setFilterContact(contacts.current)
        }
        else {
            clearInterval(intervalFlag.current)
            const filterContact = contacts.current.filter((contact) => {
                // return contact['username'].toLowerCase() === searchContact.toLowerCase()
                const pattern = searchContact.toLowerCase() + "\w*"
                const regex = new RegExp(pattern)
                return regex.test(contact['username'].toLowerCase())
            })
            setFilterContact(filterContact)
        }
    }

    useEffect(() => {
        intervalFlag.current = setInterval(intervalFn, 500);

        // Cleanup the interval when the component unmounts
        return () => {
          clearInterval(intervalFlag.current);
        };
    }, []);
      

    return (
        <Container>
            <Searchbar handleSearch={handleSearch} setSearch={setSearchContact}/>
            <ContactWrapper>
                <ContactList searchId={filteredContact} userId={userId} setSelectedConvo={setSelectedConvo}/>
            </ContactWrapper>
        </Container>
    );
}
 
export default Contact;