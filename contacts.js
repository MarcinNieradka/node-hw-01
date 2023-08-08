const fs = require('fs').promises;
const path = require('path');
require('colors');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error occured when trying to read file:'.red, error);
    throw error;
  }
};

const writeContactsFile = async contacts => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('File has been updated.'.green);
  } catch (error) {
    console.error('Error occured when trying to update file:'.red, error);
    throw error;
  }
};

const listContacts = async () => {
  try {
    const contacts = await readContactsFile();
    console.log('Contacts list:'.yellow);
    console.table(contacts);
  } catch (error) {
    console.error('Error occured when trying to show contacts:'.red, error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await readContactsFile();
    const searchedContact = contacts.find(contact => contact.id === contactId);
    if (searchedContact) {
      console.log('Contact found:'.green);
      console.table(searchedContact);
    } else {
      console.log('Contact not found'.red);
    }
  } catch (error) {
    console.error('Error occured when trying to get contact:'.red, error);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await readContactsFile();
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    if (filteredContacts.length < contacts.length) {
      await writeContactsFile(filteredContacts);
      console.log(`Contact with ID ${contactId} removed.`.green);
    } else {
      console.log(`Contact with ID ${contactId} not found`.yellow);
    }
  } catch (error) {
    console.error('Error occured when removing contact:'.red, error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readContactsFile();
    const newContact = {
      id: `${Date.now()}`,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    console.log('New contact added:'.green);
    console.table(newContact);
  } catch (error) {
    console.error('Error occured when adding contact:'.red, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
