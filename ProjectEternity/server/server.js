require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/productModel");
const app = express();

const port =8081 ;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connection established to the Database ");
    app.listen(port, () => console.log(`Server has started on port: ${port}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
// app.get("/", (req, response) => {
//   response.status(200);
//   response.statusMessage("Hi there");
// });
//Get all the users from the database
// app.get('/userGet', async (req, res) => {
//     try {
//         const user = await userModel.find({});
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
//     }
//     })

//Get a single user from the database by id
// app.get('/userGet/:id', async (req, res) => {
// try {
//     const{id} = req.params.id;
//     const user = await userModel.findById({id});
//     res.status(200).json(user);
// } catch (error) {
//     console.log(error.message);
//     res.status(500).json({message: error.message});
// }
// })

// app.get('/', (req, res) => {

//   res.send('Welcome to this awesome API server!');
// })

app.post("/userPost", async (req, res) => {

//   const { username } = req.body.username;
const{ username, email} = req.body;


  // Check if the username already exists in the database
  const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });

  if (!existingUser) {
    //  res.status(200).json({ message: 'Username is available' });
     try {
        const user = await userModel.create(req.body);
        res.status(200).redirect('/main.html');
       
       
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
  } else {
    res.status(400).json({ message: "Username or email is already in use." });
}




});


