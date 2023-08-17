import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname, resolve } from 'path';
import 'colors';
import { v4 } from 'uuid';
import * as readline from 'readline';

// const dirname_path = dirname(fileURLToPath(import.meta.url));
// const contactsPath = join(dirname_path, 'db', 'contacts.json');
const contactsPath = resolve('db', 'contacts.json');

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error occurred when trying to read file:'.red, error);
    throw error;
  }
};

const writeContactsFile = async contacts => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('File has been updated.'.green);
  } catch (error) {
    console.error('Error occurred when trying to update file:'.red, error);
    throw error;
  }
};

const listContacts = async () => {
  try {
    const contacts = await readContactsFile();
    console.log('Contacts list:'.yellow);
    console.table(contacts);
  } catch (error) {
    console.error('Error occurred when trying to show contacts:'.red, error);
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
    console.error('Error occurred when trying to get contact:'.red, error);
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
    console.error('Error occurred when removing contact:'.red, error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readContactsFile();
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    console.log('New contact added:'.green);
    console.table(newContact);
  } catch (error) {
    console.error('Error occurred when adding contact:'.red, error);
  }
};

const editContact = async contactId => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const contacts = await readContactsFile();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      console.log(`Contact with ID ${contactId} not found`.yellow);
      return;
    }

    const editContact = contacts[index];
    console.log(`Now editing`.yellow, `${JSON.stringify(editContact, null, 2)}: `);

    const contactKeys = ['name', 'email', 'phone'];

    for (const key of contactKeys) {
      const newValue = await new Promise(resolve => {
        rl.question(`Provide new ${key}, or press enter to skip ${editContact[key]}): `, resolve);
      });
      if (newValue) {
        editContact[key] = newValue;
      }
    }

    contacts[index] = editContact;
    console.log(`Changed contact to ${JSON.stringify(contacts[index], null, 2)}`);
    await writeContactsFile(contacts);
  } catch (error) {
    console.error('An error occurred:'.red, error);
  } finally {
    rl.close();
  }
};

export { listContacts, getContactById, removeContact, addContact, editContact };
