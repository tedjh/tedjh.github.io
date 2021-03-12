var score=0;
var cardsLength = 0;
var address="";
var myapp;

/*---------------------------------------------------------------------1*/
/*
var app = (function(cardDeck, Showdown) {
  "use strict";

    var cardCount = 0,
      cards = cardDeck.cards,
      cardsLength = cardDeck.cards.length,
      markdownConverter = new Showdown.converter();
      
    function shuffle(array) {
        var counter = array.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter = counter - 1;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    return {
      init: function() {
        cardCount = 0;
        cards = shuffle(cards);
      },
      getNextCard: function() {
        var card;
        if (cardCount !== cardsLength) {
          card = cards[cardCount];
          cardCount = cardCount + 1;
        } else {
          cardCount = 0;
        }
        return card;
      },
      markdownToHTML: function(markdownText) {
        var text = markdownText.replace(new RegExp('\\|', 'g'), '\n');
        return markdownConverter.makeHtml(text);
      }
    };
})(alphabetDeck, Showdown);
*/
/*---------------------------------------------------------------------1*/

/*---------------------------------------------------------------------2*/
function myfunction(cardDeck, Showdown) {
  "use strict";

    var cardCount = 0,
      cards = cardDeck.cards,
      cardsLength = cardDeck.cards.length,
      markdownConverter = new Showdown.converter();
      
    function shuffle(array) {
        var counter = array.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter = counter - 1;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    return {
      init: function() {
        cardCount = 0;
        cards = shuffle(cards);
      },
      getNextCard: function() {
        var card;
        if (cardCount !== cardsLength) {
          card = cards[cardCount];
          cardCount = cardCount + 1;
        } else {
          cardCount = 0;
        }
        return card;
      },
      markdownToHTML: function(markdownText) {
        var text = markdownText.replace(new RegExp('\\|', 'g'), '\n');
        return markdownConverter.makeHtml(text);
      }
    };
}
/*---------------------------------------------------------------------2*/

//var alphabet_app = myfunction(alphabetDeck, Showdown);
//var greetings_app = myfunction(greetingsDeck, Showdown);

/*
$(document).on("pagecreate","#title-page", function() {
  "use strict";
  if (navigator.userAgent.match(/Android/i)) {
    window.scrollTo(0, 1);
  }
});*/

$(document).on("pageshow", function() {
  "use strict";
  address=window.location.hash.substring(1);
  if (address == "alphabet-page"){
    myapp = myfunction(alphabetDeck, Showdown);
    cardsLength = alphabetDeck.cards.length;
    $("#alphabet-page").on("swipeleft", function() {
      nextCard();
    });
  } else if (address == "greetings-page"){
    myapp = myfunction(greetingsDeck, Showdown);
    cardsLength = greetingsDeck.cards.length;
    $("#greetings-page").on("swipeleft", function() {
      nextCard();
    });
  } else {
    return false;
  }

  myapp.init();
  document.getElementById("score-"+address).innerHTML = "<p>" + score +"/"+cardsLength+"</p>";
  function nextCard() {
    //Remember there is another nextCard() function down below!!!
    $('#flash-card').trigger('collapse');
    var card = myapp.getNextCard();
    if (card === undefined) {
      window.location.href = 'index.html';
    } else {
      document.getElementById("sign-"+address).value = "";
      document.getElementById("visibleanswer-"+address).style.display="none";
      document.getElementById("nextbutton-"+address).style.display="none";
      document.getElementById("submitbutton-"+address).style.display="block";
      document.getElementById("skip-card-"+address).style.display="block";
      $('#question-'+address).html(myapp.markdownToHTML(card.question));
      $('#answer-'+address).html(myapp.markdownToHTML(card.answer));
    }
  }
  nextCard();
/*
  $("#next-card").on("click", function() {
    nextCard();
  });
  $("#skip-card").on("click", function() {
    nextCard();
  });
  if (address == "alphabet-page"){
      $("#alphabet-page").on("swipeleft", function() {
        nextCard();
      });
      $(document).on('pageshow','#alphabet-page', function() {
        nextCard();
      });
    } else if (address == "greetings-page"){
      $("#greetings-page").on("swipeleft", function() {
        nextCard();
      });/*
      $(document).on('pageshow','#greetings-page', function() {
        nextCard();
      });*/
});

function refresh() {
  score=0;
  if (window.location.hash.substring(1) == "alphabet-page"){
    document.getElementById("score-"+address).innerHTML = "<p>" + score +"/"+alphabetDeck.cards.length+"</p>";
    myapp.init();
  } else if (window.location.hash.substring(1) == "greetings-page"){
    document.getElementById("score-"+address).innerHTML = "<p>" + score +"/"+greetingsDeck.cards.length+"</p>";
    myapp.init();
  }
}

function validateForm() {
  var x = document.getElementById("sign-"+address).value;
  var y = document.getElementById("answer-"+address).textContent;
  var X = x.toLowerCase(); var Y=y.toLowerCase();
  X = X.trim(); Y=Y.trim();
  X=X.replace(/[^a-zA-Z ]/g, ""); Y=Y.replace(/[^a-zA-Z ]/g, "");
  if (x == "") {
      document.getElementById("visibleanswer-"+address).style.display="none";
      document.getElementById("sign-"+address).style.borderColor = 'red';
      document.getElementById("sign-"+address).style.borderWidth = "medium";
      return false;
  } else if (X== Y) {
      document.getElementById("visibleanswer-"+address).innerHTML = "<img src='images/right.PNG'><p style='display:inline'>Correct!</p>";
      document.getElementById("nextbutton-"+address).style.display="block";
      document.getElementById("submitbutton-"+address).style.display="none";
      document.getElementById("skip-card-"+address).style.display="none";
      document.getElementById("visibleanswer-"+address).style.display="block";
      document.getElementById("sign-"+address).style.borderColor = 'darkgrey';
      document.getElementById("sign-"+address).style.borderWidth = "thin";
      score = score +1;
      document.getElementById("score-"+address).innerHTML = "<p>" + score +"/"+cardsLength+"</p>";
  } else {
      document.getElementById("visibleanswer-"+address).innerHTML = "<img src='images/wrong.PNG'><p style='display:inline'>The correct answer is: " + y + "</p>"
      document.getElementById("skip-card-"+address).style.display="none";
      document.getElementById("submitbutton-"+address).style.display="none";
      document.getElementById("nextbutton-"+address).style.display="block";
      document.getElementById("visibleanswer-"+address).style.display="block";
      document.getElementById("sign-"+address).style.borderColor = 'darkgrey';
      document.getElementById("sign-"+address).style.borderWidth = "thin";
      document.getElementById("score-"+address).innerHTML = "<p>" + score +"/"+cardsLength+"</p>";
  }
}
function nextCard() {
  $('#flash-card').trigger('collapse');
  var card = myapp.getNextCard();
  
  if (card === undefined) {
    alert("Well done! Your final score was "+score +"/"+cardsLength+".");
    window.location.href = 'index.html';
  } else {
      document.getElementById("sign-"+address).value = "";
      document.getElementById("visibleanswer-"+address).style.display="none";
      document.getElementById("nextbutton-"+address).style.display="none";
      document.getElementById("submitbutton-"+address).style.display="block";
      document.getElementById("skip-card-"+address).style.display="block";
    $('#question-'+address).html(myapp.markdownToHTML(card.question));
    $('#answer-'+address).html(myapp.markdownToHTML(card.answer));
  }
}
