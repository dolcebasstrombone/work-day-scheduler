//display current date and time at the top (use moment)
var currentTime = moment();
$("#currentDay").text(currentTime.format("MMMM Do YYYY"));

//user input handler
//on click, turn p into textarea
$(".time-block").on("click", ".description", function () {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("descriptionInput flex-grow-1").val(text);
  $(this).replaceWith(textInput);
  //highlight text
  textInput.trigger("focus"); //not working
});
//on blur, turn back into p
$(".time-block").on("blur", ".descriptionInput", function () {
    var textToSave = $(this).val().trim();
    var textSet = $("<p>").addClass("description flex-grow-1").text(textToSave);
    $(this).replaceWith(textSet);
  });

//save to local storage
function saveChanges() {}

//retrive from local storage
function getSavedChanges() {}

//color coding based on past, present, or future (use moment)
function timeColorCode() {}
//past, present, future  classes already in CSS (see moment documentation)
//if time is in past, change tense class to past. currentTime.isAfter()
//if time is present, change tense class to present. currentTime.isSame()
//if time is in future, change tense class to future. currentTime.isBefore()

//time blocks can be hard coded in html
//blessed be simple column and row layouts for easy media queries, amen
