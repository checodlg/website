const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sergiodlgca@gmail.com',
        pass: 'Checo000999!' // It's recommended to use environment variables or OAuth2 for security
    }
});

app.post('/send', (req, res) => {
    const mailOptions = {
        from: req.body.email, // sender address
        to: 'sergiodlgca@gmail.com', // your email
        subject: `Message from ${req.body.name}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Sent');
        }
    });
});

app.use(express.static('./')); // Serve your static files
app.listen(3000, () => console.log('Server started on port 3000'));
