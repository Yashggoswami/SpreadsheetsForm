var express=require('express'),
router=express.Router(),
controller=require('./controller'),
auth=require("auth.js"),
con=require("database.js");


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

router.post('/login',(req,res)=>{
    const { username,password} = req.body;

    con.query('Use database user',(err,result)=>{
        con.query(`Select * from users where password="${password}" AND usrname="${username}";`,(err,row)=>{
            if(err)
                console.log(err)
            else{
               
                if(row){
                    console.log(row[0]);
                    req.session.user=row[0];
                    res.render("index");
                }
                else
                    res.render("login");

            }
        })
    })
});

router.post('/register', (req, res) => {
    
    const { username,email,password, confirmPassword } = req.body;
    
    if (password === confirmPassword) {
        con.query('Use database user',(err,result)=>{
            con.query(`Select * from users where usrname="${username}";`,(err,result)=>{
                if(err)
                    console.log(err);
                else
                   {
                       
                       if(result.email){
                           console.log(result);
                       res.render('signup', {
                        message: 'User already registered.',
                        messageClass: 'alert-danger'
                    });}else{
                        con.query(`Insert into users (usrname,email,password) values ("${username}","${email}","${password}")`,(err,result)=>{
                            res.render('login', {
                                message: 'Registration Complete. Please login to continue.',
                                messageClass: 'alert-success'
                            });
                        })
                       

  
                    }

                   }
               
            })
       });

    }
    else{
        res.render('signup', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
});

module.exports = router;
