const router = require('express').Router();

const User = require('../models/user-model');
const authCheck = (req, res, next)=>{
    console.log("*************************");
    console.log(req.user);
    if(!req.user){
        // User is not logged in
        res.redirect('/auth/login');
    }
    else{
        // User is logged in
        next();
    }
}
router.get('/emp',authCheck,(req, res)=>{
    User.query(`select row_to_json(employees)  from "perez_HR".employees`,(err,res1)=>{
        if(err){
            console.log(err);
        }else{   
            console.log(res1.rows)  
            res.render('employee',{test: res1.rows, user: req.user});                   
              
        }        
    });
    
});

router.get('/dept',authCheck,(req, res)=>{
    User.query(`select row_to_json(departments)  from "perez_HR".departments`,(err,res1)=>{
        if(err){
            console.log(err);
        }else{   
            console.log(res1.rows)  
            res.render('department',{test: res1.rows, user: req.user});                   
              
        }        
    });
    
});

router.get('/empdept',authCheck,(req, res)=>{
    User.query(`SELECT row_to_json(get_user_dept) FROM "perez_HR".get_user_dept() `,(err,res1)=>{
        if(err){
            console.log(err);
        }else{   
            console.log(res1.rows)  
            res.render('empdept',{test: res1.rows, user: req.user});                   
              
        }        
    });
});

router.get('/salary',authCheck,(req, res)=>{
    User.query(`SELECT row_to_json(get_above_135) FROM "perez_HR".get_above_135() `,(err,res1)=>{
        if(err){
            console.log(err);
        }else{   
            console.log(res1.rows)  
            res.render('salary',{test: res1.rows, user: req.user});                   
              
        }        
    });
});


module.exports = router;