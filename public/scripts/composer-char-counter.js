// Handles all logic for the character counter

$( document ).ready(function() {

  // Event handler for any input to the new tweet text area 
  $( "#tweet-text" ).on("input", function( e ) {

    // Constant for max tweet length
    const maxLength = 140;

    // Set the current length to be the total length of all input to the text area
    const currentLength = e.target.value.length;

    // The counter value represents the amount of characters that can currently be added to the tweet text
    // Therefore, it is calculated by subtracting the current tweet length from the max tweet length
    const counter = maxLength - currentLength;

    // Traverse up the DOM tree then back down to find node that matches the counter class
    $( this ).parents().find('.counter').val(function() {
      
      // Set the colour of the counter based on the value
      if (counter < 0) $( this ).addClass("red");
      else $( this ).removeClass("red");

      // Set the value of the counter to be shown on the page
      return counter;
    });
  });
});