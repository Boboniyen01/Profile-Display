const path = require('path');

const fs = require('fs')
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index')
})


app.get('/confirm', function (req, res) {
    res.render('submit')
})
app.get('/preview', function (req, res) {
    const userData = req.body
    const htmlfilepath = path.join(__dirname, 'data.json')
    const fileData = fs.readFileSync(htmlfilepath)
    const userStored = JSON.parse(fileData)
    res.render('preview', { numberOfProfile: userStored.length , userstoreddata: userStored,})
})

app.post('/confirm', function (req, res) {
    const userData = req.body
    const htmlfilepath = path.join(__dirname, 'data.json')
    const fileData = fs.readFileSync(htmlfilepath)
    const userStored = JSON.parse(fileData)
    userStored.push(userData)
    fs.writeFileSync(htmlfilepath, JSON.stringify(userStored) + '\n')
    res.redirect('/confirm')
})
app.listen(5000)