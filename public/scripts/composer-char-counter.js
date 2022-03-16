// Handles all logic for the character counter

$( document ).ready(function() {

  // Should spaces and newe lines add one character to the length? currently they do

  // Event handler for any input to the new tweet text area 
  $( "#tweet-text" ).on("input", function( e ) {

    // Constant for max tweet length, currently this is in multiple places (here, client and index.html) would it make sense to store this in just one place? If i set a max length on the text area in index.html i think that would make sense but the counter would then never be red
    // Constant for max tweet length
    const maxLength = 140;
    
    // See tips in compass, they dont really make sense, the question holds: WHY is this a tip plz provide some context... very confusing

    // Set the current length to be the total length of all input to the text area
    // So here how do we know to access currentTarget.value.length, see the consol logs at the bottom for example    
    const currentLength = e.target.value.length;

    // The counter value represents the amount of characters that can currently be added to the tweet text
    // Therefore, it is calculated by subtracting the current tweet length from the max tweet length
    const counter = maxLength - currentLength;

    //As per above text related to tips... why do this?

    // Traverse up the DOM tree then back down to find node that matches the counter class
    $( this ).parents().find('.counter').val(function() {
      
      // Set the colour of the counter based on the value
      // currently css is in this file is there a work around here?
      if (counter < 0) $( this ).css("color", "red");
      else $( this ).css("color", "#545149");

      // This sets the value of the counter to be shown on the page
      return counter;
    });
    // console.log(counter);

  //   console.log(e);
  //   console.log(e.currentTarget);
  //   console.log(e.currentTarget.value);
  //   console.log(e.currentTarget.value.length);
  //   console.log(this);
  });
});