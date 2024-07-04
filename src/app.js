import express from "express";
import { User, Sub, templateDB } from "./db/conn.js"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { error } from "console";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', join(__dirname, "../static/templates"));
app.set('view engine', 'ejs');

const static_path = join(__dirname, "../static");
app.use(express.static(static_path));


// index
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {
    const { email } = req.body;
    const sub = new Sub({
        email
    });
    console.log(req.body);
    const sub1 = await Sub.findOne({ email });
    if (!sub1){
        sub.save()
        .then(() => {
            return res.status(201).json({ error: "Thank You for Subscribing" })
        })
        .catch(e => {   
            console.log(e);
            return res.status(500).json({ error: 'Error while Subscribing' });
        });
    } else {
        return res.json({error: "You are Already Faimly"});
    } 
});

// register
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const { orgType, name, email, phoneNumber, password } = req.body;
    const user = new User({
        orgType,
        name,
        email,
        phoneNumber,
        password
    });
    user.save()
        .then(() => res.status(201).json({ message: 'user registered successfully' }))
        .catch(e => {
            console.error(e);
            res.status(500).json({ message: 'Error while registering' });
        });
});


// login
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); 

        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        } else if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password' });
        } else {
            const orgType = user.orgType;
            const temps = await templateDB.find({ orgType: orgType });
            return res.status(201).send({ user, temps });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});




// testing purpose
// app.get('/testing', async (req, res) => {
//     try {
//         const temps = await templateDB.find({ orgType: 'school' });
//         console.log(temps);
//         res.render('testing', { temps });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while fetching templates.');
//     }
// });








app.listen(port, () => {
    console.log(`server running -> ${port}`)
});