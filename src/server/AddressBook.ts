import fs from 'fs';
import path from 'path';
import {uuid} from 'uuidv4'



// I have tried to add postgres for data persistent, but my webpack set up is preventing
// me from building the code.
// I haven't delt with webpack for long time and had a trouble setting it up.
// I spent many hours to fix it, but I wasn't able to.
// I decided to use a file to stor data.

export interface Contact {
  firstName: string,
  lastName: string,
  emails: string[]
}

export interface ConactResponse extends Contact {
  id: string;
}

export interface PaginatedConactResponse  {
  contacts: ConactResponse[],
  page: number,
  itemsPerPage: number,
  totalItems: number,
}

export class AddressBook {


  addContact = (contact: Contact) : ConactResponse => {
    try {
      const contacts = this.getAllContacts()
      const id = uuid()
      contacts[id] = contact;
      this.writeContacts(contacts)
      return {
        id, 
        ...contact
      }
    }catch (error){
      throw error
    }
  }

  getContactsPaginated = (page:number, itemsPerPage: number) : PaginatedConactResponse => {
    try{
      const contactList = this.getAllContacts()
      const totalItems = Object.keys(contactList).length;
      const sortedContact = this.sortedWName(Object.entries(contactList));
      const contacts = [];
      const remainingItemsOfLastPage = totalItems%itemsPerPage;
      const numberOfPages = Math.ceil(totalItems/itemsPerPage)
      if (numberOfPages <= page){
        let startingIdx = 0;
        let endingIdx = 0
        if (numberOfPages === page){
          startingIdx = totalItems - remainingItemsOfLastPage;
          endingIdx = totalItems;
        } else {
          startingIdx = itemsPerPage*page-1
          endingIdx = itemsPerPage*page+itemsPerPage;
        }
        for (let i=startingIdx; i<endingIdx; i++){
          const {firstName, lastName, emails} = sortedContact[i][1]
          contacts.push( { 
            id: sortedContact[i][0],
            firstName, 
            lastName, 
            emails
          });
        }
      }
      return {
        contacts,
        page,
        itemsPerPage,
        totalItems,
      }
    }catch (error){
      throw error
    }
  }

  deleteContact = (id: string) => {
    try {
      const contacts = this.getAllContacts();
      if (!contacts[id]){
       throw new Error(`Contact with ID ${id} not found`)
     } 
      delete contacts[id];
      this.writeContacts(contacts);
    }catch (error){
      throw error
    }

  }

  getContact = (id: string ) : ConactResponse => {
    try{
      const contacts = this.getAllContacts();
      if (contacts[id]){
        return  {id: id, 
          ...contacts[id] }
      } else {
        throw new Error(`Contact with ID ${id} not found`)
      }
    }catch(error){
      throw error
    }
  }

  updateContact = (id: string, contact: Contact) : ConactResponse => {
    try {
      const contacts = this.getAllContacts();
      contacts[id] = contact;
      this.writeContacts(contacts);
      console.log({contact});
      if (contacts[id]){
        return  {
          id: id, 
          ...contact }
      } else {
        throw new Error(`Contact with ID ${id} not found`)
      }
    }catch(error){
      throw error
    }

  }


  private getAllContacts =  (): {[id: string]: Contact} => {
    try{
      const data = fs.readFileSync(path.resolve(__dirname, '../', './contacts.json'), 'utf-8');
      return JSON.parse(data);
    }catch(error){
      throw error
    }
  }

  private sortedWName = (contacts) : [number, Contact] => {
    return contacts.sort((a, b) => {
        const aFirstChar = a[1].firstName.charAt(0);
        const bFirstChar = b[1].firstName.charAt(0);
        if (aFirstChar > bFirstChar) {
          return 1;
         } else if (aFirstChar < bFirstChar) {
            return -1;
        } else {
        var aLastChar = a[1].lastName.charAt(0);
        var bLastChar = b[1].lastName.charAt(0);
        if (aLastChar > bLastChar) {
          return 1;
        } else if (aLastChar < bLastChar) {
          return -1;
        } else {
          return 0;
        }    
      }
    });
  }


  private writeContacts =  (contacts) => {
      const data = JSON.stringify(contacts, null, 2);
      return fs.writeFileSync(path.resolve(__dirname, '../', './contacts.json'), data);
  }
}