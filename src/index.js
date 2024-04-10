

const controller = { //exportado desde otro archivo
    findStuff: ()=>{/*finds the stuff in mongodb database*/} 
}

const routerA = Router();
routerA.get('/',(req, res)=>{
    const items = controller.findStuff()
    res.send(items)
})

const routerB = Router();
routerB.get('/',(req, res)=>{
    const items = controller.findStuff()
    res.render('myView', {items})
})