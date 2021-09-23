import React, { useState } from 'react';
import Form from './Form';

export const Contact = ({ emails, firstName, lastName, }) => {
  const [contactInfo, setContact] = useState({
    emails,
    firstName,
    lastName,
  });
  const [emailInfo, setEmail] = useState('')
  const [addEmail, setAddEmail] = useState(false);
  const [add, setAdd] = useState(false);

   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // console.log(re.test(String(value).toLowerCase()));
  const handleChange = (e) => {
    const {value, name} = e.target;
    if (name !== 'email'){
      setContact( {...contactInfo, [name]:value});
    } else {
      console.log({value, emailInfo})
      setEmail(value);
    }
  }

  const handleAddEmail = () => {
    setAddEmail(!addEmail);
    setAdd(!add);
  }

  const handleAdd = () => {
    setAddEmail(!addEmail);
    setAdd(!add);
    setContact({...contactInfo, emails: [...contactInfo.emails, emailInfo]})
  }

  const handleRemoveEmail = (index) => {
    let newEmail = [...contactInfo.emails];
    newEmail.splice(index, 1);
    setContact( { ...contactInfo, emails: newEmail })
  }
  console.log({contactInfo})
  const emailList = () => contactInfo.emails.map((email, idx) => {
    return (<div key={idx}>{email}<span onClick={() => handleRemoveEmail(idx)}>-</span></div>)
  })
 
  return(
    <>
    <div>
      <label>First Name</label>
      <Form handleChange={handleChange} name={'firstName'} text={contactInfo.firstName}/>
      <label>Last Name</label>
      <Form handleChange={handleChange} name={'lastName'} text={contactInfo.lastName}/>
      {emailList()}
      { !addEmail ? <div><span onClick={handleAddEmail}>+</span><span>add email</span></div> : (
        <>
        <div><Form handleChange={handleChange} name={'email'} text={emailInfo}/><span onClick={handleAdd}>+</span><span>add</span></div>
        </>
       ) }
      <div>
        <button>Delete</button> <span><button>Cancel</button><button>Save</button></span>
      </div>
    </div>
    </>
  )
}