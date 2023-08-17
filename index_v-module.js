import { Command } from 'commander';
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  editContact,
} from './contacts_v-module.js';
import 'colors';

const program = new Command();

program
  .option('-a, --action <type>', 'wybierz działanie')
  .option('-i, --id <type>', 'identyfikator użytkownika')
  .option('-n, --name <type>', 'imię użytkownika')
  .option('-e, --email <type>', 'email użytkownika')
  .option('-p, --phone <type>', 'numer telefonu użytkownika');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        await listContacts();
        break;
      case 'get':
        await getContactById(id);
        break;
      case 'add':
        await addContact(name, email, phone);
        break;
      case 'remove':
        await removeContact(id);
        break;
      case 'edit':
        await editContact(id);
        break;
      default:
        console.warn('\x1B[31m Nieznany typ działania!');
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error.message.red);
  }
}

invokeAction(argv);
