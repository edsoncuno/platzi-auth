const nodemailer = require("nodemailer");
//https://nodemailer.com/about/
require('dotenv').config();

async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.NODEMAILER_USER, // sender address
        to: "edsoncuno1@gmail.com", // list of receivers
        subject: "Hello ✔ Test nodemailer", // Subject line
        text: "Estoy probando nodemailer", // plain text body
        html: "<h1>Aqui va la pagina web que envio como carta<h1>", // html body
        // agrego este comentario para hacer una prueba del git rm
    });
}

main().catch(console.error);