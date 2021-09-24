import React, { useEffect, useState } from 'react';
import Form from './Form';

export const Contact = ({ emails, firstName, lastName, setCancel}) => {
  console.log(emails, firstName, lastName);
  const [contactInfo, setContact] = useState({emails, firstName, lastName});
 useEffect(() => {
  setContact({emails, firstName, lastName})
 }, [emails, firstName, lastName])
  const [emailInfo, setEmail] = useState('')
  const [addEmail, setAddEmail] = useState(false);
  const [add, setAdd] = useState(false);
  const [showMinus, setShowMinus] = useState({});
  const [validation, setValidation] = useState([]);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // console.log(re.test(String(value).toLowerCase()));
  const handleChange = (e) => {
    const {value, name} = e.target;
    setValidation([])
    if (name !== 'email'){
      setContact( {...contactInfo, [name]:value});
    } else {
      console.log({value, emailInfo})
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
     if (!re.test(String(emailInfo).toLowerCase())) {
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
    console.log(setCancel)
    setCancel(true)
  }
  console.log({contactInfo})

  const handleSubmit = () => {
    const {firstName, lastName } = contactInfo;
  }

  const emailList = () => contactInfo.emails.map((email, idx) => {
    return (<div key={idx} className='email' onMouseEnter={() => handleMouseEnter(idx)}  onMouseLeave={()=> handleMouseLeave(idx)}>{email} {showMinus[idx] && <span className='icon minus' onClick={() => handleRemoveEmail(idx)}><ion-icon name="remove-outline"></ion-icon></span>}</div>)
  })
 
  return(
    <>
    {validation.length && validation.map(message => (<div style={{color: 'red'}}>{message}</div>))}
    <form className='contact' onSubmit={handleSubmit}>
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
          <Form handleChange={handleChange} name={'email'} text={emailInfo}/>
          <span className='icon small-plus' onClick={handleAdd}><ion-icon name="add-outline"></ion-icon>
          </span>
          <span>add</span>
        </div>
        </>
       ) }
      <div className='buttons'>
        <a className='button del'>Delete</a> 
        <span style={{display:'inline-block'}}>
          <a className='button cal' onClick={handleCancel}>Cancel</a>
          <a type="submit" className='button save'>Save</a>
        </span>
      </div>
    </form>
    </>
  )
}