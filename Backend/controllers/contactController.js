// D:\Protofolio_CMS\Backend\controllers\contactController.js
import { sendMessage } from '../config/sendEmail.js';
import Contact from '../models/contactSchema.js';

// Send Message to the Portfolio owner
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Save contact message
    const contact = new Contact({ name, email, message });
    const savedContact = await contact.save();

    // Send email notification to portfolio owner
    await sendMessage(name,email,`New Message from`,message)

    res.status(201).json({
      data: savedContact,
      message: 'Contact message submitted and email sent successfully',
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: error.message });
    }
    res.status(500).json({ message: 'Error submitting contact', error: error.message });
  }
};


// Get All the Messages Send by the user 
export const getAllContacts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};


// Delete Conatct Messages
export const deleteContact = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};