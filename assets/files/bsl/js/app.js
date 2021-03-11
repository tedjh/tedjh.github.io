var app = (function(cardDeck, Showdown) {
  "use strict";

  var appName = 'Flash Cards',
    version = '0.2',
    cardCount = 0,
    cards = cardDeck.cards,
    cardsLength = cardDeck.cards.length,
    markdownConverter = new Showdown.converter();

  function shuffle(array) {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter = counter - 1;

      // And swap the last element with it
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
})(flashcardDeck, Showdown);

/*
 jQueryMobile event handlers
 */
$(document).bind('pageinit', function(event, ui) {
  "use strict";
  app.init();
  $('#app-title').text(flashcardDeck.title);
  $('#app-catch-phrase').text(flashcardDeck.catchPhrase);
});

$(document).delegate("#title-page", "pagecreate", function() {
  "use strict";
  $(this).css('background', '#457B9D');
  if (navigator.userAgent.match(/Android/i)) {
    window.scrollTo(0, 1);
  }
});

$(document).delegate("#main-page", "pageinit", function() {
  "use strict";
  function nextCard() {
    //Remember there is another nextCard() function down below!!!
    $('#flash-card').trigger('collapse');
    var card = app.getNextCard();
    if (card === undefined) {
      window.location.href = 'index.html';
    } else {
      document.getElementById("visibleanswer").style.display="none";
      document.getElementById("theform").style.display="block";
      document.forms["myform"]["sign"].value = "";
      document.getElementById("nextform").style.display="none";
      document.getElementById("skip-card").style.display="block";
      $('#question').html(app.markdownToHTML(card.question));
      $('#answer').html(app.markdownToHTML(card.answer));
    }
  }

  $("#next-card").bind("click", function(event, ui) {
    nextCard();
  });
  $("#skip-card").bind("click", function(event, ui) {
    nextCard();
  });
  $("#main-page").on("swipeleft", function(event) {
    nextCard();
  });
  $(document).delegate('#main-page', 'pageshow', function() {
    nextCard();
  });
});

function validateForm() {
  var x = document.forms["myform"]["sign"].value;
  var y = document.getElementById("answer").textContent;
  if (x == "") {
      document.getElementById("visibleanswer").style.display="none";
      document.getElementById("sign").style.borderColor = 'red';
      document.getElementById("sign").style.borderWidth = "medium";
      return false;
  } else if (x== y) {
      document.getElementById("visibleanswer").innerHTML = "<img src='images/right.png'><p style='display:inline'>Correct!</p>"
      document.getElementById("theform").style.display="none";
      document.getElementById("skip-card").style.display="none";
      document.getElementById("visibleanswer").style.display="block";
      document.getElementById("nextform").style.display="block";
      document.getElementById("sign").style.borderColor = 'darkgrey';
      document.getElementById("sign").style.borderWidth = "thin";
  } else {
      document.getElementById("visibleanswer").innerHTML = "<img src='images/wrong.png'><p style='display:inline'>The correct answer is: " + y + "</p>"
      document.getElementById("theform").style.display="none";
      document.getElementById("skip-card").style.display="none";
      document.getElementById("visibleanswer").style.display="block";
      document.getElementById("nextform").style.display="block";
      document.getElementById("sign").style.borderColor = 'darkgrey';
      document.getElementById("sign").style.borderWidth = "thin";
  }
}
function nextCard() {
  $('#flash-card').trigger('collapse');
  var card = app.getNextCard();
  if (card === undefined) {
    window.location.href = 'index.html';
  } else {
      document.getElementById("visibleanswer").style.display="none";
      document.getElementById("theform").style.display="block";
      document.forms["myform"]["sign"].value = "";
      document.getElementById("nextform").style.display="none";
      document.getElementById("skip-card").style.display="block";
    $('#question').html(app.markdownToHTML(card.question));
    $('#answer').html(app.markdownToHTML(card.answer));
  }
}