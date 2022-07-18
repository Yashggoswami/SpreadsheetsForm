var express=require('express'),
router=express.Router(),
controller=require('./controller');


router.get('/',(req,res)=>{
    res.render("index")
})
router.post('/API/w/Spreadsheet/WriteForm/:spreadsheetUrl/:sheetName',controller.addData)
router.get('/API/r/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.FormCreateAPI)

module.exports = router;
