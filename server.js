const nodemailer = require('nodemailer');

// Configuração do transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seuemail@gmail.com',
        pass: 'suasenha'
    }
});

app.post('/notify', (req, res) => {
    const { email, evento } = req.body;

    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: email,
        subject: 'Novo Evento Cadastrado',
        text: `Você cadastrou o evento: ${evento}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar email');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Notificação enviada com sucesso!');
        }
    });
});
