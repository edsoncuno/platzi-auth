const nodemailer = require("nodemailer");
//https://nodemailer.com/about/

async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'edsoncuno2@gmail.com',
            pass: 'crlqkuqzadpsimjg',
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'edsoncuno2@gmail.com', // sender address
        to: "edsoncuno1@gmail.com", // list of receivers
        subject: "Hello ✔ Test nodemailer", // Subject line
        text: "Estoy probando nodemailer", // plain text body
        html: "<h1>Aqui va la pagina web que envio como carta<h1>", // html body
    });
}

main().catch(console.error);