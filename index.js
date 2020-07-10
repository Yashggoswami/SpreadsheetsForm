var express=require('express'),
router=express.Router(),
controller=require('./controller');

router.get('/main',controller.mainfunction)


module.exports = router;