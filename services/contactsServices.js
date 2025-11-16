import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (id) => Contact.findByPk(id);

export const addContact = (payload) => Contact.create(payload);

export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContact = async (id, payload) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export const updateStatusContact = async (id, payload) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
