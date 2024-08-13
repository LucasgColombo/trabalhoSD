const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Adiciona suporte a CORS
app.use(bodyParser.json()); // Adiciona suporte a JSON
app.use(express.static('/home/lucas/Documentos/GitHub/trabalhoSD')); // Servir arquivos estáticos a partir da raiz do projeto

// Rota para exibir o gráfico
app.get('/graph', (req, res) => {
    res.sendFile(path.join('/home/lucas/Documentos/GitHub/trabalhoSD', 'graph.html'));
});

// Rota para fornecer os dados do CSV
app.get('/get-data', (req, res) => {
    const games = [];

    fs.createReadStream('/home/lucas/Documentos/GitHub/trabalhoSD/cleaned_steam_games.csv')
        .pipe(csv())
        .on('data', (row) => {
            games.push(row);
        })
        .on('end', () => {
            res.json(games);
        });
});

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lucas.colombo@estudante.ufla.br', // Substitua pelo seu email
        pass: 'ogfd nplm jcuy lsqg' // Substitua pela sua senha de aplicativo
    }
});

// Rota para notificação por email
app.post('/notify', (req, res) => {
    const { email, evento } = req.body;

    const mailOptions = {
        from: 'lucas.colombo@estudante.ufla.br',
        to: email,
        subject: 'Novo Evento Cadastrado',
        text: `Você cadastrou o evento: ${evento}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
            res.status(500).send('Erro ao enviar email');
        } else {
            console.log('Email enviado:', info.response);
            res.send('Notificação enviada com sucesso!');
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
