import { Resend } from 'resend'
import { RESEND_KEY, DOMAIN_EMAIL, FROM_EMAIL } from "../config.js"

const resend = new Resend(RESEND_KEY)
// Funcion de envio de emails
export  const sendEmail = async (data, title) => {
    try {
        await resend.emails.send({
            from: DOMAIN_EMAIL,
            to: FROM_EMAIL,
            subject: title,
            html: `<p><strong>${data.name}</strong> te ha enviado el siguiente menesje: </p>
                    <p>${data.message}</p>`
        })
    } catch (error) {
        console.error(error)
    }
}