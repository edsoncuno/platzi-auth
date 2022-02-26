const nodemailer = require("nodemailer");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const service = require('./User.service');

class RecoveryPassword {
    #user;
    constructor() {
        this.#user = new service();
    }
    #sendEmail(infoMail) {
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
        await transporter.sendMail({
            from: process.env.NODEMAILER_USER, // sender address
            to: infoMail.to, // list of receivers
            subject: infoMail.subject, // Subject line
            html: infoMail.html, // html body
        });
    }
    sendRecoveryEmail(email) {
        const user = await this.#user.findByCorreo(email);
        if (user == null) {
            return {};
        } else {
            const payload = {
                sub: user._id,
                role: user.role
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15min' });
            const link = `http://localhost:3000/recovery-password?token=${token}`;
            const infoMail = {
                to: 'edsoncuno1@gmail.com',
                subject: 'Recuperacion de contraseña',
                html: `<p>Indresa ha esta link para recuperar tu contraseña => ${link}</p>`
            };
            await this.#user.updateUser(user._id, { recoveryPasswordToken: token });
            await this.#sendEmail(infoMail);
            return { error: false, severity: 'sucess', summary: 'Exito', detail: 'Se envio email para recuperar la contraseña' };
        }
    }

    #changePassword(token, newPassword) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await this.#user.findByCorreo(payload.email);
        if (user.recoveryPasswordToken !== token) {
            return { error: true, severity: 'info', summary: 'Error', detail: 'Error al validar el token' };
        } else {
            const hash = await bcrypt.hash(data.password, 7);
            await this.#user.updateUser(user._id, { recoveryPasswordToken: null, password: hash });
            return { error: false, severity: 'success', summary: 'Exito', detail: 'Se la cmbio la contraseña' }
        }
    }
}

module.exports = RecoveryPassword;
/**
 * CUANDO SE LE HA CLICK A EL BOTON RECUPERAR CONTRASEñA
 * SE LE MANDA UN CORREO DE RECUPERACION, Y MUESTRA EL MENSAJE SE ENVIO EL VIDEO DE RECUPERACION
 * 
 * DESPUES HAY QUE IMPLEMETAR EL PROCESO DE VALIDAR EL TOKEN Y VALIDAR
 */