import mongoose from 'mongoose'
import { USERNAME, PASSWORD, DB } from './config.js';

// Conexios a mongo db mediante moongoose
export const conectDB = async () => {
    // const URL = 'mongodb+srv://'+ USERNAME +':' + PASSWORD + `@cluster0.1utk0jp.mongodb.net/`+ DB +`?retryWrites=true&w=majority`;
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1utk0jp.mongodb.net/${DB}?retryWrites=true&w=majority`
    try{
        await mongoose.connect(URL)
        console.log(">>> DB is conected")
    } catch (error) {
        console.log(error)
    }
};