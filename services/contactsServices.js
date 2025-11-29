import Contact from "../db/models/Contact.js";

export const listContacts = (owner, page = 1, limit = 20, favorite) => {
  const offset = (page - 1) * limit;

  const whereClause = {owner};

   if (favorite !== undefined) {
    whereClause.favorite = favorite === 'true';
  }
  
  return Contact.findAll({ where: whereClause, limit: parseInt(limit), offset: parseInt(offset), order: [['createdAt', 'DESC']] })};

export const getContactById = (id, owner) => Contact.findOne({ where: { id, owner } });

export const addContact = (payload, owner) => Contact.create({ ...payload, owner });

export const removeContact = async (id, owner) => {
  const contact = await getContactById(id, owner);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContact = async (id, payload, owner) => {
  const contact = await getContactById(id, owner);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export const updateStatusContact = async (id, payload, owner) => {
  const contact = await getContactById(id, owner);
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
