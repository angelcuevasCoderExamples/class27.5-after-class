const express = require('express');
const itemsRouter = require('./routes/items.router')
const viewsRouter = require('./routes/views.router')
const cartRouter = require('./routes/cart.router');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const ItemsManager = require('./dao/dbManagers/ItemsManager');
const mongoose = require('mongoose');
const messageModel = require('./dao/models/message');
const {sessionRouter} = require('./routes/sessions.router');
const manager = new ItemsManager(__dirname+'/files/items.json')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./config/passport.config')
const cookieParser = require('cookie-parser');
const { mongoConnectionLink, port } = require('./config/config');

mongoose.connect(mongoConnectionLink).then(()=>{
    console.log('connected to atlas.')
})

const app = express();


initializePassport()
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//handlebars config
app.use(cookieParser())
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
// app.use(session({
//     secret:'sessionSecret',
//     resave:false,
//     saveUninitialized:false
// }))

//public files
app.use(express.static(`${__dirname}/public`))


const serverHttp = app.listen(port, ()=>console.log(`Server running on port ${port}`));


//socket.io
const io = new Server(serverHttp)

app.use((req, res, next)=>{
    req.io = io; 
    next();
})

io.on('connection',async (socket)=>{
    console.log('socket connected')

    socket.on('new item',async (newItem)=>{
        await manager.addItem(newItem)
        const items = await manager.getItems();
        io.emit('list updated', {items:items})
    })

    socket.on('delete item',async ({id})=>{
        await manager.deleteItem(id)
        const items = await manager.getItems();
        io.emit('list updated', {items:items})
    })

    /** CHAT */
    const messages = await messageModel.find().lean()
    socket.emit('chat messages', {messages})

    socket.on('new message', async (messageInfo)=>{
        await messageModel.create(messageInfo)
        const messages = await messageModel.find().lean()
        io.emit('chat messages', {messages})
    })  

})


//routes
app.use('/api/items', itemsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)

