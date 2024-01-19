require('dotenv').config(); // at the top of your file to use dotenv

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Transporter setup using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Use environment variables
        pass: process.env.PASSWORD
    }
});

app.post('/send', (req, res) => {
    const mailOptions = {
        from: req.body.email, // sender address
        to: process.env.RECEIVER_EMAIL, // receiver email from environment variables
        subject: `Message from ${req.body.name}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email successfully sent.');
        }
    });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(3000, () => console.log('Server started on port 3000'));
