var express=require('express'),
router=express.Router(),
controller=require('./controller');
auth=require("auth.js")

router.get('/',(req,res)=>{
    if(req.user) {
        console.log("aarae");
        res.render("index");
    }
    else {
        res.render("signup");
    }
    
})
router.post('/API/w/Spreadsheet/WriteForm/:spreadsheetUrl/:sheetName',controller.addData)
router.get('/API/r/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.FormCreateAPI)



router.get('/login', function(req, res) {
    res.render("login");
});

router.get('/signup', function(req, res) {
    res.render("signup");
});
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login', 
    auth.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = router;
