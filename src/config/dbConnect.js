import mongoose from "mongoose"

mongoose.connect("mongodb+srv://rafa_speres:UxwZG95uTrQYiax@alura.r130m1p.mongodb.net/alura-node?");

let db = mongoose.connection;

export default db;