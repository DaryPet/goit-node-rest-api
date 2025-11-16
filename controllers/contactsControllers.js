import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
	try {
		const contacts = await contactsService.listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
};

export const getOneContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contactsService.getContactById(id);
		if (!contact) {
			return next(HttpError(404, "Not found"));
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

export const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const removed = await contactsService.removeContact(id);
		if (!removed) {
			return next(HttpError(404, "Not found"));
		}
		res.status(200).json(removed);
	} catch (error) {
		next(error);
	}
};

export const createContact = async (req, res, next) => {
	try {
		const newContact = await contactsService.addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await contactsService.updateContact(id, req.body);
		if (!updated) {
			return next(HttpError(404, "Not found"));
		}
		res.status(200).json(updated);
	} catch (error) {
		next(error);
	}
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await contactsService.updateStatusContact(id, req.body);
        if (!updated) {
            return next(HttpError(404, "Not found"));
        }
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};