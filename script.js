var gameClicks = [];
var playerClicks = [];

var isStrict = 0;
var gameLevel = 0;

$('#strict').click(function(){
  switch(isStrict){
    case 0:
        isStrict++;
        $('#smallBtn').css('background','red');
        break;
    case 1:
        isStrict--;
        $('#smallBtn').css('background','#000');
  }
});

//Checks Player's Choices versus the game array
function compareClicks(game,player){
    if(game.length == player.length){
        if(game.toString() == player.toString() ){
            return true
        }
        else return false
    }
    for(var i = 0; i < player.length; i++){
        if(game[i] != player[i]){
            return false
        }
    }
    return true
};

//Lights the box and make noise.  "Kick the Tires and light the fires"
function btnAction(val){
    setTimeout(function(){ $('#'+val).toggleClass(val+'Click'); }, 100);
    setTimeout(function(){document.getElementById(val + "Sound").play(); }, 100);
    setTimeout(function(){ $('#'+val).toggleClass(val+'Click'); }, 1000);
}

//Check button clicks
$('#green').click(function(event){
    yourMove = event.target.id;
    playerClicks.push(yourMove);
    btnAction(yourMove);
    console.log(playerClicks);
});

$('#red').click(function(event){
    yourMove = event.target.id;
    playerClicks.push(yourMove);
    btnAction(yourMove);
    console.log(playerClicks);
});

$('#yellow').click(function(event){
    yourMove = event.target.id;
    playerClicks.push(yourMove);
    btnAction(yourMove);
    console.log(playerClicks);
});

$('#blue').click(function(event){
    yourMove = event.target.id;
    playerClicks.push(yourMove);
    btnAction(yourMove);
    console.log(playerClicks);
});

//Player Clicks the buttons
function playerAction(){
         
        setTimeout(function(){

        if(compareClicks(gameClicks,playerClicks)){
            if(gameClicks.length == playerClicks.length){
                setTimeout(function(){playGame(); }, 2000);
                return true
            }
            playerAction();
            return false
        }
        $('#level').html('Er');
        setTimeout(function(){$('#level').html(gameLevel); }, 1000);
        setTimeout(function(){
            playerClicks = [];
            if(isStrict){
                gameLevel = 0;
                gameClicks = [];
                setTimeout(function(){playGame();}, 1000);
                return false
            }
            var delay = 0;
            gameClicks.forEach(function(c){
                delay+= 100;
                setTimeout(function(){ $('#'+c).toggleClass(c+'Click'); }, delay);
                setTimeout(function(){document.getElementById(c + "Sound").play(); }, delay);
                delay+=1000
                setTimeout(function(){ $('#'+c).toggleClass(c+'Click'); whoTurn = 'Player'; }, delay);
                
            });
            playerAction(); }, 1000);

        },1000)    
}

//Starts the Simon game
function playGame(){
    playerClicks = [];
    var colors = ['red','green','blue','yellow'];
    var colorPicker = colors[Math.abs(Math.floor(Math.random()*4))];
    gameClicks.push(colorPicker);
    gameLevel++
    $('#level').html(gameLevel);
    delay = 0;
    gameClicks.forEach(function(c){
        delay+= 100;
        setTimeout(function(){ $('#'+c).toggleClass(c+'Click'); }, delay);
        setTimeout(function(){document.getElementById(c + "Sound").play(); }, delay);
        delay+=1000
        setTimeout(function(){ $('#'+c).toggleClass(c+'Click'); whoTurn = 'Player'; }, delay);
        
    });
    playerAction();

    if(gameLevel == 21){
        alert('You Win');
        gameLevel = 0;
        gameClicks = [];
        playerClicks = [];
        return true
    }
   return false 
};

//Reset the game
$('#reset').click(function(){
    gameLevel = 0;
    gameClicks = [];
    playerClicks = [];
});

$('#start').click(function(){
  $('#level').html('00');
  setTimeout(function(){playGame()}, 1000);
});