import dotenv from 'dotenv'
dotenv.config()

// Variables de configuración
export const TOKEN_SECERT = process.env.TOKEN_SECERT
export const USERNAME = process.env.USERNAME_DB
export const PASSWORD = process.env.PASSWORD_DB
export const DB = process.env.DB

// Emails
export const RESEND_KEY = process.env.RESEND_KEY
export const DOMAIN_EMAIL = process.env.DOMAIN_EMAIL // dominio desde donde se enviara el email
export const FROM_EMAIL = process.env.FROM_EMAIL // Correo a donde llegara el email