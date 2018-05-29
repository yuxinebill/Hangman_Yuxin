
$(document).ready(function() {          
      //  create a var, which is array pinkSongs [], and it contains 5 songs' name; and each song is a string
      var pinkSongs = ["Beautiful Trauma", "What About Us", "Just Give Me a Reason", "Try", "Perfect"];

      // var thisTurnSong [i] = pick a random song ， and the shows the song on the left
      
      var thisTurnSong ;

      // this function will pick up a song from all PINK's songs 
      function thisTurnSongFun () {
      
        //generate a var randomly for the index of pinkSongs
        var i = Math.floor(Math.random()* pinkSongs.length);
        // pick up one song from all the songs
        thisTurnSong = (pinkSongs[i].toLowerCase()).split(" ");
        
      };

      thisTurnSongFun();
      console.log(thisTurnSong);

      var thisTurnWord ;

      //this function will pick up a word from the name of the song
      function thisTurnWordFun () {      
        //generate a var randomly for the index of the song 
        var i = Math.floor(Math.random()* thisTurnSong.length);
        //pick up a word from the song
        thisTurnWord = thisTurnSong[i].split("");        
      };

      thisTurnWordFun ();
      console.log(thisTurnWord);

      //write the letter on the screen, but setup font color as white, so user cannot see it
      function thisTurnWordLoop () {

          for (i=0; i<thisTurnWord.length; i++){

          //create new div 
          var newDiv = $("<h1>");

          var newID = "myID" + i;

          console.log(newID);

          var eachLetter = $(newDiv).text(thisTurnWord[i]).addClass("d-inline-block text-white border-bottom border-danger mx-1 myFrame").attr("id", newID);
          
          $("#thisTurnWord").append(eachLetter );
        } ; 
      }

      thisTurnWordLoop ();
      
      // user have how many chance to guess the word, which is double of the letters in the word
      var userChance = thisTurnWord.length * 2
      $("#left").text(userChance);

      var losses = 0;
      var wins = 0;

      function resetGame () {
        $("#history").empty();
        $("#thisTurnWord").empty();
        thisTurnSongFun();
        thisTurnWordFun();
        thisTurnWordLoop ();
        userChance = thisTurnWord.length * 2
        $("#left").text(userChance);
      };

      // when user click the key, will trigger the function 
    document.onkeyup = function (event) {

      //setup a var to record what letter the user type in
      var userChoice = event.key.toLowerCase();

      //if user type a letter, them show the letter on screen, if not, the show a alert window
      var checkLetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      
      var checkLetter_user = checkLetter.indexOf(userChoice);
      
      if (checkLetter_user >=0 ){
        $("#history").append(userChoice +", ");
      } else {
        alert(userChoice + " is not a letter!");
      }

      //if the user pick a wrong letter, he would lose a chance; if user pick a right letter, then will run a loop
      var checkLetter_word = thisTurnWord.indexOf(userChoice);

      if (checkLetter_word<0){
        userChance --;
        $("#left").text(userChance);
        if (userChance < 0) {
          losses ++;
          alert("You lose. Play again.")
          $("#losses").text(losses);
          resetGame();
        }
      } else {

            for (i=0; i<thisTurnWord.length; i++) {          
              // if the user choose a right letter, then show the letter on the screen by changing the text color from white to blue
              if( userChoice == thisTurnWord[i]) {

                var newID = "myID" + i;

                $("#" + newID).removeClass("text-info").addClass("text-success");
              }  
            }
            
            // get the total of how many class in the doc      
            var totalInfoColorClass = $(".text-success").length;

            if (totalInfoColorClass == thisTurnWord.length) {
              wins++;
              alert("You Win. Play again.");
              $("#wins").text(wins);
              resetGame();
            }         
        }
    }


    });
