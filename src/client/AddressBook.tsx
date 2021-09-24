import Contacts from "./Contacts"
import React, { useState } from 'react';
import { Contact } from "./Contact";
import './main.css';

const AddressBook = () => {
const initialState = [{
    id: 1,
    firstName: 'Steve',
    lastName: 'Chung',
    emails:['steve@email.com', 'test@email.com']
  },
  {id: 2,
   firstName: 'Sun',
    lastName: 'Chung',
  emails:['sun@email.com']}]
  const [selectedId, setSelect]  = useState(-1);
  const [selectedInfo, setSelectedInfo] = useState(initialState[0])
  const [isCanceled, setCancel] = useState(false)
  const handleClick = (selectedId) => {
    console.log(selectedId)
    setSelect(selectedId);
    setSelectedInfo(initialState.filter(({id}) => id === selectedId)[0])
  } 
  console.log(selectedInfo)
  return (
    <>
    <div className='container'>
      <Contacts isCanceled={isCanceled} setCancel={setCancel} setSelectedInfo={setSelectedInfo} handleSelect={handleClick} contacts = {initialState}></Contacts>
      <Contact  setCancel={setCancel}  {...selectedInfo}></Contact>
    </div>
    </>
  )
}

export default AddressBook