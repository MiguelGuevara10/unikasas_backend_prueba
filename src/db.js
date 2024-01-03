import mongoose from 'mongoose'
import { USERNAME, PASSWORD, DB } from './config.js';

/**
 * Funcion de conexión a mongo db mediante moongoose 
*/
export const conectDB = async () => {
    // URl en la Nube Atlas Mongo db
    // const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.keqxeqo.mongodb.net/${DB}?retryWrites=true&w=majority`

    // Url en local require tener inastalado Mongo DB en local
    const URL = `mongodb://localhost:27017/${DB}`
    try{
        await mongoose.connect(URL)
        console.log(">>> DB is conected")
    } catch (error) {
        console.log(error)
    }
};