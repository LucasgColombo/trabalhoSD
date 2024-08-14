const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer'); // Importando o multer para uploads

const app = express();
app.use(cors()); // Adiciona suporte a CORS
app.use(bodyParser.json()); // Adiciona suporte a JSON
app.use(express.static('/app')); // Servir arquivos estáticos a partir da raiz do projeto

// Configuração do multer para uploads
const upload = multer({ dest: 'uploads/' }); // Diretório onde os arquivos serão salvos

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para exibir o gráfico
app.get('/graph', (req, res) => {
    res.sendFile(path.join(__dirname, 'graph.html'));
});

// Rota para fornecer os dados do CSV
app.get('/get-data', (req, res) => {
    const games = [];

    fs.createReadStream('cleaned_steam_games.csv')
        .pipe(csv())
        .on('data', (row) => {
            games.push(row);
        })
        .on('end', () => {
            res.json(games);
        });
});

// Rota para upload do arquivo CSV
app.post('/upload', upload.single('dataset'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    // Caminho do arquivo enviado
    const filePath = path.join(__dirname, req.file.path);

    // Mover ou processar o arquivo conforme necessário
    fs.rename(filePath, path.join(__dirname, 'cleaned_steam_games.csv'), (err) => {
        if (err) {
            console.error('Erro ao mover o arquivo:', err);
            return res.status(500).send('Erro ao processar o arquivo.');
        }
        res.send('Arquivo recebido e salvo com sucesso!');
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
