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

const listContacts = () => {
  readContactsFile()
    .then(contacts => {
      console.log('Contacts list:'.yellow);
      console.table(contacts);
    })
    .catch(error => {
      console.error('Error occured when trying to show contacts:'.red, error);
    });
};

const getContactById = contactId => {
  readContactsFile()
    .then(contacts => {
      const searchedContact = contacts.find(contact => contact.id === contactId);
      if (searchedContact) {
        console.log('Contact found:'.green);
        console.table(searchedContact);
      } else {
        console.log('Contact not found'.red);
      }
    })
    .catch(error => {
      console.error('Error occured when trying to get contact:'.red, error);
    });
};

const removeContact = contactId => {
  readContactsFile()
    .then(contacts => {
      const filteredContacts = contacts.filter(contact => contact.id !== contactId);
      if (filteredContacts.length < contacts.length) {
        writeContactsFile(filteredContacts)
          .then(() => {
            console.log(`Contact with ID ${contactId} removed.`.green);
          })
          .catch(error => {
            console.error('Error occurred when removing contact:'.red, error);
          });
      } else {
        console.log(`Contact with ID ${contactId} not found`.yellow);
      }
    })
    .catch(error => {
      console.error('Error occurred when removing contact:'.red, error);
    });
};

const addContact = (name, email, phone) => {
  readContactsFile()
    .then(contacts => {
      const newContact = {
        id: `${Date.now()}`,
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      writeContactsFile(contacts)
        .then(() => {
          console.log('New contact added:'.green);
          console.table(newContact);
        })
        .catch(error => {
          console.error('Error occurred when adding contact:'.red, error);
        });
    })
    .catch(error => {
      console.error('Error occurred when adding contact:'.red, error);
    });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
