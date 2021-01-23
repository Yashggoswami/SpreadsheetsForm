var express=require('express'),
router=express.Router(),
controller=require('./controller');


router.get('/',(req,res)=>{
    res.render("index")
})
router.get('/spreadid/:spreadsheetUrl/:sheetName',controller.demofunc)
router.get('/Spreadsheet/CreateForm/:spreadsheetUrl/:sheetName',controller.FormCreate)


// router.get(
//     "/allsheets/:project_title/:project_slug",
//     // controller.ExportAllsheet
//   );
module.exports = router;
