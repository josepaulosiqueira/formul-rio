const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'josepaulosiqueira28@gmail.com',
        pass: 'Sensei2030$'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

app.post('/enviar-email', (req, res) => {
    const { email, data, oc, cc, prod, valor, forn, lu, sit, nf } = req.body;

    const mailOptions = {
        from: 'josepaulosiqueira28@gmail.com',
        to: email,
        subject: `Follow-up de Ordem de Compras - OC: ${oc}`,
        text: `Data: ${data}\nNumero da Oc: ${oc}\nCentro de Custo: ${cc}\nProduto: ${prod}\nValor: R$${valor}\nFornecedor: ${forn}\nLocal de Uso: ${lu}\nSituação: ${sit}\nNota Fiscal: ${nf}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Erro ao enviar o email:', error);
            res.status(500).send('Erro ao enviar o email.');
        } else {
            console.log('Email enviado:', info.response);
            res.status(200).send('Email enviado com sucesso.');
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
