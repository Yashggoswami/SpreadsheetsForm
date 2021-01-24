var express=require('express'),
router=express.Router(),
controller=require('./controller');


router.get('/',(req,res)=>{
    res.render("index")
})
router.get('/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.FormCreate)
router.get('/API/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.FormCreateAPI)

module.exports = router;
