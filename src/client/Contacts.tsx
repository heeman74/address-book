import React, { useState } from "react"



const Contacts = ({handleSelect, contacts, setSelectedInfo, setCancel, isCanceled}) => {
  const [selectedId, setSelect] = useState(contacts[0]?.id || -1)
  const handleClick = (id) => {
    setSelect(id);
    handleSelect(id);
    setCancel(false);
  }
  const contactsList = contacts.map((contact) => {
    const {firstName, lastName, id} = contact;
   return(
   <div className= { selectedId === id && !isCanceled ? 'contact-name selected' : 'contact-name'} key={id} onClick={() => handleClick(id)}>
     {firstName} {lastName}
  </div>) 
  })
  return(
    <>
    <div className='contacts'>
      <h2 style={{fontWeight:"bold", paddingLeft:'8%', paddingRight: '12%'}}>
        Contacts 
        <span className='icon add-contact' onClick={() => { setSelectedInfo({firstName: '', lastName: '', email: ''}); setSelect(-1);}}>
          <ion-icon name="add-outline">
          </ion-icon>
        </span>
      </h2>
      <div className='contact-list'>
       { contacts.length ? contactsList : (<div></div>) }
      </div>
    </div>
    </>
  );
}

export default Contacts