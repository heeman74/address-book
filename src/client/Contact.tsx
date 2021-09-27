import React, { useEffect, useState } from 'react';
import Form from './Form';

export const Contact = ({ emails, id, firstName, lastName, setCancel, addressBookHandleSubmit, handleDelete, setMessage}) => {
  const [contactInfo, setContact] = useState({emails, firstName, lastName});
 useEffect(() => {
  setContact({emails, firstName, lastName})
  if (id === -1){
    setEmail('')
  }
 }, [emails, firstName, lastName])
  const [emailInfo, setEmail] = useState('')
  const [addEmail, setAddEmail] = useState(false);
  const [add, setAdd] = useState(false);
  const [showMinus, setShowMinus] = useState({});
  const [validation, setValidation] = useState([]);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleChange = (e) => {
    const {value, name} = e.target;
    setValidation([])
    setMessage('')
    if (name !== 'email'){
      setContact( {...contactInfo, [name]:value});
    } else {
      setEmail(value);
    }
  }

  const handleMouseEnter = (index) => {
    setShowMinus({...showMinus, [index]: true})
  }

  const handleMouseLeave = (index) => {
    setShowMinus({...showMinus, [index]: false})
  }

  const handleAddEmail = () => {
    setAddEmail(!addEmail);
    setAdd(!add);
  }

  const handleAdd = () => {
     if (!re.test(String(emailInfo).toLowerCase()) && emailInfo !== '') {
      setValidation([...validation, 'Please enter a valid email address!'])
     } else {
       setAddEmail(!addEmail);
       setAdd(!add);
       if (emailInfo !== '') {
         setContact({...contactInfo, emails: [...contactInfo.emails, emailInfo]})
       }
     }
  }

  const handleRemoveEmail = (index) => {
    let newEmail = [...contactInfo.emails];
    newEmail.splice(index, 1);
    setContact( { ...contactInfo, emails: newEmail })
  }

  const handleCancel = () => {
    setContact({firstName: '', lastName: '', emails: []})
    setEmail('');
    setCancel(true)
  }

  const validatInput = () => {
    const {firstName, lastName } = contactInfo;
    if (firstName === '' && lastName === '') {
      setValidation([...validation, 'Please enter first name!', 'Please enter last name!']);
    } else if (firstName === ''){
        setValidation([...validation, 'Please enter first name!']);
    } else if (lastName === ''){
      setValidation([...validation, 'Please enter last name!']);
    };
  }
  const handleSubmit = () => {
      validatInput();
      const {firstName, lastName } = contactInfo;
      if (firstName !== '' || lastName !== '') {
        addressBookHandleSubmit(contactInfo);
    }
  }

  const emailList = () => contactInfo.emails.map((email, idx) => {
    return (<div key={idx} className='email' onMouseEnter={() => handleMouseEnter(idx)}  onMouseLeave={()=> handleMouseLeave(idx)}>{email} {showMinus[idx] && <span className='icon minus' onClick={() => handleRemoveEmail(idx)}><ion-icon name="remove-outline"></ion-icon></span>}</div>)
  })
  return(
    <>
   
    <form className='contact'>
       {validation.length ? validation.map(message => (<div style={{color: 'red'}}>{message}</div>)) : null}
      <div className='name-form'>
        <div>
          <label>First Name</label>
          <Form handleChange={handleChange} name={'firstName'} text={contactInfo.firstName}/>   
        </div>
        <div>
          <label>Last Name</label>
          <Form handleChange={handleChange} name={'lastName'} text={contactInfo.lastName}/>
        </div>
        
      </div>
      <div className='email-list'>
        {emailList()}
      </div>
      { !addEmail ? <div><span onClick={handleAddEmail} className='icon small-plus'><ion-icon name="add-outline"></ion-icon></span><span>add email</span></div> : (
        <>
        <div>
          <Form handleChange={handleChange} name={'email'}  text={emailInfo}/>
          <span className='icon small-plus' onClick={handleAdd}><ion-icon name="add-outline"></ion-icon>
          </span>
          <span>add</span>
        </div>
        </>
       ) }
      <div className='buttons'>
        <a className='button del'onClick={handleDelete}>Delete</a> 
        <span style={{display:'inline-block'}}>
          <a className='button cal' onClick={handleCancel}>Cancel</a>
          <a className='button save' onClick={handleSubmit}>Save</a>
        </span>
      </div>
    </form>
    </>
  )
}