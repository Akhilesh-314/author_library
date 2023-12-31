const express = require("express");
const app = express();
const dotenv = require('dotenv')
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended:false }))

dotenv.config()

const mongoose = require('mongoose')
const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://atloginn:akhilesh@cluster0.ql6cy5y.mongodb.net/", {
            useNewUrlParser: true
        })
        const db = mongoose.connection
        db.on('error',error => console.error(error))
        db.once('open',() => console.log('Connected to Mongoose'))
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
}

connectDB()

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

const PORT = 8000 || process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})
