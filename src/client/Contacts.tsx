import React, { useState } from "react"



const Contacts = (props) => {
  const [selectedId, setSelect] = useState(-1)
  const handleClick = (id) => {
    setSelect(id);
    props.handleSelect(id);
  }
  const contactsList = props.contacts.map((contact) => {
    const {firstName, lastName, id, handleSelect} = contact;
   return(<div className={selectedId === id && 'select'} key={id} onClick={() => handleClick(id)}>{firstName} {lastName}</div>) 
  })
  return(
    <>
    <div>
      <h2>Contacts <span className='add-contact'>+</span></h2>
      {contactsList}
    </div>
    </>
  );
}

export default Contacts