var express=require('express'),
router=express.Router(),
controller=require('./controller');

router.get('/',(req,res)=>{
    res.render("index")
})


module.exports = router;