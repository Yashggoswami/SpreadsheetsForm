var express=require('express'),
router=express.Router(),
controller=require('./controller');


router.get('/',(req,res)=>{
    res.render("index")
})
router.post('/Spreadsheet/CreateForm',controller.FormCreate)

module.exports = router;
