const privateAccess = (req, res, next)=>{
    // if(!req.session.user) {
    //     console.log("not logged in")
    //     return res.redirect('/login')
    // }
    next();
}

module.exports = privateAccess;