const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = 'a27c1c21969233357a792cd08fe84da0-ee16bf1a-1faf9b3c'; 
const domain = 'sandbox3dc994bab6ff4ae7a228d494cfd03e44.mailgun.org'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const mailData = {
        from: 'Kartik <kartik4801.be22@chitkara.edu.in>',
        to: email,
        subject: 'Hii, test',
        text: 'Testing',
    };

    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        } else {
            console.log(body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});


app.listen(8000, () => {
    console.log("The Server is running");
});