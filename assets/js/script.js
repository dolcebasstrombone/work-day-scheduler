//display current date and time at the top (use moment)
var currentTime = moment();
$("#currentDay").text(currentTime.format("MMMM Do YYYY"));

//on click, turn p into textarea
$(".time-block").on("click", ".description", function () {
  var text = $(this).text().trim();
  var textHour = $(this)[0].dataset.hour;
  var textInputEl = $("<textarea>");
  textInputEl.addClass("descriptionInput flex-grow-1").val(text);
  textInputEl[0].setAttribute("data-hour", textHour);
  $(this).replaceWith(textInputEl);
  //highlight text
  textInputEl.trigger("focus"); //not working
});

//on blur, turn back into p
$(".time-block").on("blur", ".descriptionInput", function () {
  var textToSave = $(this).val().trim();
  var inputHour = $(this)[0].dataset.hour;
  var textEl = $("<p>");
  textEl.addClass("description flex-grow-1").text(textToSave);
  textEl[0].setAttribute("data-hour", inputHour);
  $(this).replaceWith(textEl);
  timeColorCode();
});

// save to local storage
$(".row").on("click", ".saveBtn", saveChanges);
function saveChanges() {
  //get the array from storage
  var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
  //fidn this buttons row
  var rowNumber = this.dataset.row;
  //find matching text box
  var textBoxInRowEl = $(".description")[rowNumber];
  //set text as a variable to save in object
  var descriptionText = textBoxInRowEl.textContent;
  //save the text in a task object
  var taskObj = {
    description: descriptionText,
    row: rowNumber,
  };
  //get rid of objects that have a matching row
  savedTasks = savedTasks.filter(function (objects) {
    //return objects that have a row that matches textBoxInRowEl
    return objects.row !== rowNumber;
  });
  savedTasks.push(taskObj);
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
}

//retrive from local storage
function displaySavedChanges() {
  //get array from storage
  var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
  savedTasks.forEach(function(thisObject) {
      //use thisObject.row to fine the row number
      rowAttr = thisObject.row;
      //use the row number to find the matching text box
      var matchingTextBoxEl = $(".description")[rowAttr]
      //display thisObject.description as the text content of the matching text box
      matchingTextBoxEl.textContent = thisObject.description;
  })
}
displaySavedChanges();

//color coding based on past, present, or future
function timeColorCode() {
  //array of each row element
  var textBoxElArray = Array.from($(".description"));

  textBoxElArray.forEach(function (timeRow) {
    //pull the hour from the description class data
    var taskMoment = moment().hour(timeRow.dataset.hour);
    // console.log(currentTime);
    // console.log(taskMoment);

    //if task is in the past, change the class to past
    if (
      moment(taskMoment).isBefore(currentTime) &&
      !timeRow.classList.contains("past")
    ) {
      timeRow.setAttribute("class", "description past flex-grow-1");
    }
    //if task is now, change the class to present ------------------------------------TODO not working, fix compare condition
    if (
      moment(taskMoment).isSame(currentTime, "hour") &&
      !timeRow.classList.contains("present")
    ) {
      timeRow.setAttribute("class", "description present flex-grow-1");
    }
    //if class is in the future, change the class to future
    if (
      moment(taskMoment).isAfter(currentTime) &&
      !timeRow.classList.contains("future")
    ) {
      timeRow.setAttribute("class", "description future flex-grow-1");
    }
  });
}
timeColorCode();
