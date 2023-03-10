const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
	const contacts = await listContacts();
	const result = contacts.find(item => item.id === id);
	if (!result) {
		return null
	}
	return result
};

const removeContact = async (id) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === id);
	if (index === -1) {
		return null;
	};
	
	const [result] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return result;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = { id: v4(), name, email, phone };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};