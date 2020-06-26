
 var today = new Date();
 document.getElementById("datetime").innerHTML = today.toLocaleDateString();
 var dd = String(today.getDate()).padStart(2, '0');
 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 var yyyy = today.getFullYear();
 
 today = mm + '/' + dd + '/' + yyyy;
 document.write(today);

 
$(document).ready(function() {
  
  
  var test = false;
  var now = moment().format('MMMM Do YYYY');

  var hour24 = moment().format('H');
  var hour12 = moment().format('h');

  if (test) {
    hour24 = 13;
    hour12 = 1;
  }

  // Get stored todos from localStorage
  var plans = JSON.parse(localStorage.getItem("plans"));

  if (test) { console.log(plans); }

  if (plans !== null) {
    planTextArr = plans;
  } else {
    planTextArr = new Array(9);
    planTextArr[0] = "Hello World";
  }

  if (test) { console.log("full array of plned text",planTextArr); }

  
  var $plannerDiv = $('#plannerContainer');
  $plannerDiv.empty();

  if (test) { console.log("current time",hour12); }

//loop
  for (var hour = 9; hour <= 17; hour++) {
    var index = hour - 9;
    
    var $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    // Time box 
    var $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    var $timeBoxSpn = $('<span>');
    
    $timeBoxSpn.attr('class','timeBox');
    
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);

    // build row components
    var $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');

    $dailyPlanSpn.val( planTextArr[index] );
    
    var $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');
    
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);

    // START building save portion of row
    var $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    var $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);
    
    updateRowColor($rowDiv, hour);
    
    $plannerDiv.append($rowDiv);
  };


  // saves to local storage
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    if (test) { console.log('click pta before '+ planTextArr); }

    var $index = $(this).attr('save-id');

    var inputId = '#input-'+$index;
    var $value = $(inputId).val();

    planTextArr[$index] = $value;


    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click pta after '+ planTextArr); }

    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("plans", JSON.stringify(planTextArr));
  });  
  
  // update row color
  function updateRowColor ($hourRow,hour) { 

    if (test) { console.log("rowColor ",hour24, hour); }

    if ( hour < hour24) {
      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > hour24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css("background-color","tomato")
    }
  };

  // function to color save button on change of input
  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }

    var i = $(this).attr('hour-index');

    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});
