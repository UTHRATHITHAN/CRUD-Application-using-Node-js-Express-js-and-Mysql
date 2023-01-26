
const letters = /^[A-Za-z]+$/;



function salary() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("salary").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
  if(containsNumbers(x))
  {
      if(isNaN(x) ||  x < 1000 || x > 10000000){
      alert("Salary is out of Range");
    }else{
address();
    }
  }
    else{
      
      alert("This SALARY FIELD  contains LETTERS");
      return false;
    }
  }


  function empfunction(){
    //Myform is the name of the form
    //EmployeeName is the name of the  input field Employee name
    let x = document.forms["Myform"]["EmployeeName"].value;
    if (x == "") {
        let text = "Employee Name must be filled out"
      alert(text);
      return false;
    }
    else if(containsNumbers(x)){
      alert("This employee Field contains NUmbers");
      return false;
    }
    else{
      empIdFunction();
    }
     
  }

  function empIdFunction(){
    //Myform is the name of the form
    //EmployeeName is the name of the  input field Employee name
    let x = document.forms["Myform"]["EmployeeId"].value;
    if (x == "") {
        let text = "Employee Id must be filled out"
      alert(text);
      return false;
    }
    else if(containsNumbers(x)){
      alert("This employee iD Field contains NUmbers");
      return false;
    }
    else{
      dept();
    }
     
  }

  function dept(){
    //Myform is the name of the form
    //EmployeeName is the name of the  input field Employee name
    let x = document.forms["Myform"]["Department"].value;
    if (x == "") {
        let text = "Department must be filled out"
      alert(text);
      return false;
    }
    else
      gender();
  }
  function gender(){
    //Myform is the name of the form
    //EmployeeName is the name of the  input field Employee name
    let x = document.forms["Myform"]["radio"].value;
    if (x == "") {
        let text = "Gender must be filled out"
      alert(text);
      return false;
    }
    else
      marriedstatus();
    
  }
  function marriedstatus(){
    //Myform is the name of the form
    //EmployeeName is the name of the  input field Employee name
    let x = document.forms["Myform"]["MaritalStatus"].value;
    if (x == "") {
        let text = "MaritalStatus must be filled out"
      alert(text);
      return false;
    }
    else
     salary();
  }
  function address(){
    //Myform is the name of the form
    //EmployeeName is the name of the  input field Employee name
    let x = document.forms["Myform"]["address"].value;
    if (x == "") {
        let text = "Address must be filled out"
      alert(text);
      return false;
    }
   
  }


/*redirected to page 2
    
  function redirectFunction(){
      window.location.href = "page2.html";
      
  }
function viewpage(){
  window.location.href = "viewpage.html";
  
}
*/
function cancel(){
document.getElementById('Employee_Name').value ="";
document.getElementById('Employee_Id').value ="";


//making the value of radio button to zero


document.getElementById("Department").value = "default";


const malebtn = document.getElementById('Male');
malebtn.checked= false;

const femalebtn = document.getElementById('Female');
femalebtn.checked= false;
 
document.getElementById("MaritalStatus").value = "MaritalStatus";

const address = document.getElementById('address');
address.value = '';

  
}


  function control(){
    empfunction();
  }
//myFunction();empfunction();empIdFunction(); dept();gender();MaritalStatus();address()
  

function containsNumbers(str) {

  return Boolean(str.match(/\d/));
}