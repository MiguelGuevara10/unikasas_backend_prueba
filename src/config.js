import dotenv from 'dotenv'
dotenv.config()

// Variables de configuración
export const TOKEN_SECERT = process.env.TOKEN_SECERT
export const USERNAME = process.env.USERNAME_DB
export const PASSWORD = process.env.PASSWORD_DB
export const DB = process.env.DB

// Emails
export const EMAIL_UNIKASAS = process.env.EMAIL_UNIKASAS // Email de la empresa
export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL // Password
export const HOST_EMAIL = process.env.HOST_EMAIL // Host smpt