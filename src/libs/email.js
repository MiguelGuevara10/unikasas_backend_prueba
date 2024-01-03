import { EMAIL_UNIKASAS, PASSWORD_EMAIL, HOST_EMAIL } from "../config.js"
import nodemailer from 'nodemailer'

/**
 * Funcion de envio de correos eletronicos,
 * recibe los siguientes parametros:
 * @param {Object} data - Objeto con la informacion a enviar en el correo
 * @param {string} tipe_email - Tipo de email a enviar
 */
export  const sendEmail = async (data, tipe_email) => {
    try {
        let title = ""
        let html = ""

        const transporter = nodemailer.createTransport({
          host: HOST_EMAIL,
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: EMAIL_UNIKASAS,
            pass: PASSWORD_EMAIL,
          },
        })

        /**
         * Funcion de envio de correos eletronicos,
         * recibe los siguientes parametros:
         * @param {string} to_email - Email a que se enviara el correo
         * @param {string} subject_email - Asunto del email
         * @param {string} html_email - Html en string con el contenido del mensaje
         */
        async function send_email(to_email, subject_email, html_email){
          const result = await transporter.sendMail({
              from: `Unikasas ${EMAIL_UNIKASAS}`, // Email de la enpresa
              to: to_email, // Eamails a enviar
              subject: subject_email, // Asunto del email
              html: html_email, // Mensaje en html
          })

        //   console.log(result) // Visualizar resultados de envio
  
          transporter.close()
        }

        if (tipe_email === "respuesta_cotizacion"){ // Email de respueta de una cotización
            title = "Respuesta de cotizacion realizada"
            let fecha = new Date(data.date)
            const dia = fecha.getUTCDate().toString().padStart(2, '0')
            const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0')
            const year = fecha.getUTCFullYear().toString()
            fecha = dia + '-' + mes + '-' + year;

            html = `<p>Buen dia <b>${data.name}</b></p>
                    <p>Con respecto a la cotización realzada en nuesto sistema web de la empresa Unikasas
                           al producto cotizado el dia ${fecha}, nos permitiomos informarle la siguiente mensaje de respuesta:
                    </p>
                    <p>${data.response}</p>
                    <p>El estado de su cotización es: ${data.state}</p>`

            await send_email(data.email, title, html)
        } else if (tipe_email === 'mensaje_contacto') { // Enviar email de mensaje de contacto
              title = "Mensaje de contacto para Unikasas"
              html = `<p><b>${data.name}</b> te ha enviado el siguiente mensaje: </p>
                      <p>${data.message}</p>`

              await send_email(EMAIL_UNIKASAS, title, html)
        } else if (tipe_email === 'cotizacion_realizada'){ // Enviar email de cotizacion realizada
              // Envio para el cliente
              title = "Cotización realizada"
              html= `<p>buen dia <b>${data.name}</b>, </p>
                      <p>Nuestro equipo de trabajo en los proximos dia respondera su solicitud a la cotizacion realizada.</p>
                      <p>Gracias por utilizar nuestros servicios feliz dia.</p>`

              await send_email(data.email, title, html)
              // Envio para la empresa
              html= `<p>buen dia, </p>
                      <p>El cliente <b>${data.name}</b> realizo una nueva cotización en el sistema, feliz dia.</p>`

              await send_email(EMAIL_UNIKASAS, title, html)
          } else if (tipe_email === 'registro_usuario'){ // Email de registro de bienvenida de usuario
              title = "Registro de usuario en el sistema Unikasas"
              html = `<p>Buen dia <b>${data.username}</b>,  </p>
                        <p>Su registro de usuario en nuestro sistema ha sido exitoso</p>
                        <p>Gracias por utilizar nuestros servicios feliz dia.</p>`
              
              await send_email(data.email, title, html)
          } else if (tipe_email === 'recover_account') { // Email de recuperacion de acceso
              title = "Recuperación de cuenta sistema Unikasas"
              html = `<p>Buen dia <b>${data.username}</b>,  </p>
                        <p>El pin de acceso para la recuperación de su cuenta es: <b>${data.pin}</b></p>
                        <p>Gracias por utilizar nuestros servicios feliz dia.</p>`
              
              await send_email(data.email, title, html)
          }   

    } catch (error) {
        console.error(error)
    }
}