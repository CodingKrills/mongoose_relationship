const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();


app.use(bodyParser.json());


// Connection to MongoDB
mongoose
    .connect(
        'YOUR MONGODB URI',
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//models
const userModel = require('./models/User')
const carModel = require('./models/Car')

// get all user 
app.get('/users', (req, res) => {

    userModel.find({}, (err, allUsers) => {
        if (err) throw err;
        res.json(allUsers);
    })

})

// post user

app.post('/user', (req, res) => {

    const { name, age, cars } = req.body;

    const newUserModel = new userModel({
        name, age, cars
    })

    newUserModel.save((err, users) => {
        if (err) throw err;
        res.json(users)
    })

})


// get all cars 
app.get('/cars', (req, res) => {

    carModel.find({}, (err, allCars) => {
        if (err) throw err;
        res.json(allCars);
    })

})

// post cars

app.post('/car', (req, res) => {

    const { make, model, owner } = req.body;

    const newCarModel = new carModel({
        make, model, owner
    })

    newCarModel.save((err, cars) => {
        if (err) throw err;
        res.json(cars)
    })

})


// get users and populate his cars 

app.get('/user_car/:id', (req, res) => {

    const id = req.params.id;

    userModel.find({ _id: id }).populate('cars').exec((err, results) => {
        if (err) throw err;
        res.json(results);
    })

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})