import Contacts from "./Contacts"
import React, { useState } from 'react';
import { Contact } from "./Contact";
import './main.css';

const AddressBook = () => {

  const [selectedId, setSelect]  = useState(-1);
  const initialState = [{
    id: 1,
    firstName: 'Steve',
    lastName: 'Chung',
    emails:['steve@email.com']
  }]

  const handleClick = (id) => {
    console.log(id)
    setSelect(id);
  } 
  console.log(initialState)
  return (
    <>
    <div className='container'>
      <Contacts handleSelect={handleClick} contacts = {initialState}></Contacts>
      <Contact {...initialState[0]}></Contact>
      {/* <ContactForm></ContactForm> */}
    </div>
    </>
  )
}

export default AddressBook