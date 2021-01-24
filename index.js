var express=require('express'),
router=express.Router(),
controller=require('./controller');


router.get('/',(req,res)=>{
    res.render("index")
})
router.get('/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.addData)
// router.get('/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.FormCreate)
module.exports = router;
