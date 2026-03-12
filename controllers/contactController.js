const ContactMessage = require('../models/ContactMessage');
const sendEmail = require('../utils/sendEmail');

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
const sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Save to database
        const newMessage = await ContactMessage.create({
            name,
            email,
            subject,
            message
        });

        // Send Email
        try {
            await sendEmail({
                name,
                email,
                subject,
                message
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // We still return success since it's saved to DB, 
            // but we can log that mail failed
        }

        res.status(201).json({
            message: 'Message sent successfully',
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

module.exports = {
    sendContactMessage
};
