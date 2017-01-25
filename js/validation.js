$(document).ready(function(){

    var g_min_age=18; //Set minimum age here, will be passed to validate function at the bottom

    $.validator.addMethod("check_age", function(value, element, params) {

        // Settings
        var min_age = params.min_age;
        console.log(min_age);
        
        var birthdate = document.forms["form"]["birthdate"].value; //Get "birthdate" field value from form named "form"
        var birthdate = toDate(birthdate); //Convert the same variable to date format
        console.log('Birthdate formatted: '+birthdate);

        var currdate = new Date();
        console.log('Today: '+currdate);

        var diff = currdate - birthdate;
        var age = Math.floor(diff/(1000*60*60*24*365.25)); //Calculate age from diff result which is a date
        console.log('Age: '+age);

        //Validation
        return age >= min_age;

    }, "You should be at least "+g_min_age+" years old."); //Validation message

    function toDate(dateStr) { //Converts date input to YYYY MM DD
            var parts = dateStr.split("-");
            var year = parts[0];
            var month = parts[1];
            var day = parts[2];
            var date = new Date(parts[0], parts[1] - 1, parts[2] );
            return date;

    }

    //Initialize validation
    $("#form").validate({
      rules: {
        // compound rule
        birthdate: {
          required: true,
          check_age: {
            min_age: g_min_age //Variable g_min_age set at the top
          }
        }
      }
    });

});