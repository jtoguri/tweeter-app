/*
 * Client-side JS logic
 * jQuery is already loaded
 */

$( document ).ready(function() {

  // Function that returns a new html tweet element given a tweet object
  const createTweetElement = function(tweet) {
    
    // Escape function prevents tweets submitted with html formatting from being rendered as html
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // The tweet element is an html article, created using user, text, and time data
    // The timeago library is used to render the time that's passed since the tweet was created
    const $tweet = $(`
    <article class="tweet">
      <header>
        <img src="${tweet.user.avatars}" alt="pfp">
        <span>${tweet.user.name}</span>
        <span>${tweet.user.handle}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <ul>
          <li><i class="fa-solid fa-flag"></i></li>
          <li><i class="fa-solid fa-retweet"></i></li>
          <li><i class="fa-solid fa-heart"></i></li>
        </ul>
      </footer>
    </article>`);
    return $tweet;
  };

  // Function to load all of the tweets from the tweet database
  const loadTweets = function() {
    
    // Makes a get request to receive an array of tweet objects as JSON
    $.get("/tweets", function( data ) {
      
      // Renders all of the tweets on the page
      renderTweets(data);
    });
  };

  // The function to load all tweets is called once the page DOM is ready for JS code to execute
  loadTweets();

  // Function to render all tweets on a page given an array of tweet objects
  const renderTweets = function(tweets) {
    
    // Iterates over all tweets
    for (const tweet of tweets) {
      
      // Creates a new html tweet element for each tweet object
      const $tweet = createTweetElement(tweet);
       
      // Prepends each tweet element to the tweet container so the tweets are rendered in reverse chronological order
      // This assumes the tweets are stored in a sorted chronological order, if they were sorted in reverse chronological order, prepend would be replaced with append
      $('#tweets-container').prepend($tweet);
    }
  }

  // Event listener for form submission, currently the only form on the page is for submitting a new tweet
  $( "form" ).submit(function( e ) {
    
    // Prevent the default behaviour of the submit event (data submission and page refresh)
    e.preventDefault();

    // Ensure the error message is hidden if it was previously exposed
    $("#error-message").hide();

    const maxTweetLength = 140;

    // If the user has input more than the maximum tweet length, the counter will be less than zero
    // Display an error message and do not post the tweet
    if (Number(this.counter.value) < 0) {
      $("#error-message span").text("exceeds max tweet length");
      $("#error-message").slideDown();
      return;
    }

    // If the user has input nothing the counter will not have changed from the max length
    // Display an error message and do not post the tweet
    if (Number(this.counter.value) === maxTweetLength) {
      $("#error-message span").text("no tweet content present");
      $("#error-message").slideDown();
      return;
    }
    
    // Turn the tweet form data into a query string (format the server is set up to receive)
    const newTweet = $( this ).serialize();

    // Post the new tweet
    $.post("/tweets", newTweet, ( tweetData ) => {
      
      // Clear the text from the new tweet form and resest the counter
      $("#tweet-text").val("").trigger("input");

      // Create a new html tweet element from the most recently added tweet and render it at the top of the tweet container
      const $tweet = createTweetElement(tweetData);
      $( '#tweets-container' ).prepend($tweet);
    });
  })
});