var express = require('express');
var router = express.Router();
var database = require('../database');
const bodyParser = require('body-parser')
const { check , validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended : false})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' ,{title: " Employee Detail Form"});

});

// Search bar
router.get('/data_search', function(request, response, next){

    var search_query = request.query.search_query;

    var query = `
   SELECT Employee_Name FROM maintesting 
    WHERE Employee_Name LIKE '%${search_query}%' 
    LIMIT 10 
    `;

    database.query(query, function(error, data){

        response.json(data);

    });

});


/* Views Table page */
router.get('/data', function(request, response, next) {
 
	var query = "SELECT * FROM testingtable ORDER BY Employee_ID  ";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('data', {title:"Employee Details", action:'list', sampleData:data});
		}

	});
});


router.post("/add_data"  , function(request, response, next){
	var Employee_Name = request.body.Employee_Name;
	var Employee_Id = request.body.Employee_Id;
	var Department = request.body.Department;

	
	var Gender = request.body.radio;
	var MaritalStatus = request.body.MaritalStatus;
	var Salary =request.body.Salary;
	var address = request.body.address;

	var query = `
	INSERT INTO testingtable
	(Employee_Name,Employee_ID,Department_Team,Sex_,Marital_Status,Salary_,Address_)
	VALUES ("${Employee_Name}","${Employee_Id}","${Department}","${Gender}","${MaritalStatus}","${Salary}","${address}")
	`;

	database.query(query, function(error, data){
		if(error){
           
             response.render("errors",{title:"Change the Employee Id to Different value"});
		}
		else
		{
			request.flash('succes', 'Employee Details Successfully Inserted');
          response.redirect("/data");
		}
	});
});


router.get('/edit/:Employee_ID', function(request, response, next){

	var id = request.params.Employee_ID;

	var query = `SELECT * FROM testingtable WHERE Employee_ID = "${id}"`;

	database.query(query, function(error, data){
	

		response.render('form', {title: 'Update the Details', action:'edit', sampleData:data[0]});
  
	});

});

router.post('/edit/:Employee_ID', function(request, response, next){

	var id = request.params.Employee_ID;

    var Employee_Name = request.body.Employee_Name;
	var Employee_Id = request.body.Employee_Id;
	var Department = request.body.Department;

	
	var Gender = request.body.radio;
	var MaritalStatus = request.body.MaritalStatus;
	var Salary =request.body.Salary;
	var address = request.body.address;

	var query = `
	UPDATE testingtable 
	SET Employee_Name = "${Employee_Name}",
	Employee_ID = "${Employee_Id}",
	Department_Team="${Department}",
	Sex_ = "${Gender}",
	Marital_Status = "${MaritalStatus}",
	Salary_ ="${Salary}",
	Address_ ="${address}"
 	`;

	 database.query(query, function(error, data){
		if(error){
			
		}
		else
		{
			request.flash('success', 'Employee Data is successfully Updated');
          response.redirect('data');
		}
	});
});

router.get('/delete/:Employee_ID', function(request, response, next){

var id = request.params.Employee_ID;

var query = `

DELETE FROM testingtable WHERE Employee_ID = "${id}"

`;

database.query(query,function(error,data){


	if(error){

	}
	else{
		request.flash('success','Employee Data is successfully Deleted');
		response.redirect("/data");
	}
})
});
module.exports = router;
