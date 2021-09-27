import Contacts from "./Contacts"
import React, { useEffect, useState } from 'react';
import { Contact } from "./Contact";
import './main.css';
import axios from "axios";

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
  const [contacts, setContacts] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({
    id: -1,
    firstName: '',
    lastName: '',
    emails: []
  })
  const [isCanceled, setCancel] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getData = async() => {
      const result = await axios.get('http://localhost:3000/contacts/paginated?page=1&itemsPerPage=20')
      setSelectedInfo({id: -1, firstName: '', lastName: '', emails: []});
      setContacts(result.data.contacts);
      }
      getData();
  }, [])

  const handleClick = (selectedId) => {
    setSelect(selectedId);
    setSelectedInfo(contacts.filter(({id}) => id === selectedId)[0])
    setMessage('')
  } 

  

  const addressBookHandleSubmit = async (contact) => {
    try {
      if (selectedId === -1) {
        const response = await axios.post('http://localhost:3000/contacts', contact)
        // this can be done with new data that was given from BE to FE and added it unto the contacts state.
        // however it has already been paginated and it will need to be sorted, it used a paginated request 
        // to get the new updated contacts.  I know it is expensive operation, but it is paginated and I think it will be the
        // best option if the app needs to display 20 contacts at a time.
        console.log({response})
        const result = await axios.get('http://localhost:3000/contacts/paginated?page=1&itemsPerPage=20')
        setContacts(result.data.contacts);
        setSelectedInfo({id: -1, firstName: '', lastName: '', emails: []});
        setSelect(-1)
        setMessage('Successfully Added!')
      } else {
        const response = await axios.put(`http://localhost:3000/contacts/${selectedId}`, contact);
        const updatedContacts = [...contacts];
        updatedContacts.forEach((oldContact, idx) => {
          if (oldContact.id === selectedId) {
           updatedContacts[idx] = response.data;
          }
        })
        setContacts(updatedContacts);
        setMessage('Successfully Updated!')
      }
    }catch(error){
      if (error?.response?.data?.message){
        setMessage(error?.response?.data?.message)
      } else if (error?.response?.message) {
        setMessage(error?.response?.message)
      } else {
        setMessage('Some thing went wrong!!')
      }
      console.log({error});
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${selectedId}`);
      const newContact = [...contacts]
      const deletedContacts = newContact.filter(({id}) => id !== selectedId);
      setContacts(deletedContacts);
      setSelectedInfo({id: -1, firstName: '', lastName: '', emails: []});
      setSelect(-1)
      setMessage('Successfully Deleted!')
    }catch(error){
       if (error?.response?.data?.message){
        setMessage(error?.response?.data?.message)
      } else if (error?.response?.message){
        setMessage(error?.response?.message)
      } else {
        setMessage('Some thing went wrong!!')
      }
    }
  }

  return (
    <>
    {message !== '' ? <div style={{color: 'blueviolet', fontWeight: 'bold'}}>{message}</div> : null}
    <div className='container'>
      <Contacts isCanceled={isCanceled} setCancel={setCancel} setSelectedInfo={setSelectedInfo} handleSelect={handleClick} contacts = {contacts}></Contacts>
      <Contact setMessage={setMessage} 
        addressBookHandleSubmit={addressBookHandleSubmit} 
        handleDelete={handleDelete} 
        setCancel={setCancel}  {...selectedInfo}></Contact>
    </div>
    </>
  )
}

export default AddressBook