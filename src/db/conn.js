import mongoose from 'mongoose';
import { type } from 'os';

const url = "mongodb://localhost:27017/id_db";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log(e);
});

const subSchema = new mongoose.Schema({
    email: {
        type: String,
    }
});

const userSchema = new mongoose.Schema({
    orgType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const tempSchema = new mongoose.Schema({
    orgType: {
        type: String,
    },
    path: {
        type: String,
    },
    inputs: {
        type: Array,
    }
})

const User = mongoose.model('User', userSchema);
const Sub = mongoose.model('Sub', subSchema);
const templateDB = mongoose.model('templateDB', tempSchema);
export { User, Sub, templateDB };
