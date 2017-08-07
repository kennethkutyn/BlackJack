function addCard(){
  card = newCard();

//check if card is already in hand, don't allow doubles
  contains = false;
  for (i = 0; i < cards.length; i++) {
    if (cards[i].number == card.number && cards[i].suit == card.suit)
      contains = true;
  }
  if (contains == false){
    cards.push(card);
  } else {
    addCard();
  }
}


function hit(){
  addCard();
  calcScore();
  renderCards();
}

function stay(){
  endGame();
  document.getElementById("scoreLine").innerHTML = "Stay. Final Score: " + score;
}

function play(){
  //reset all
  cards = [];
  addCard();
  addCard();
  calcScore();
  renderCards();
  document.getElementById("handTitle").style.display = "";
  document.getElementById("hit").style.display = "";
  document.getElementById("stay").style.display = "";
  document.getElementById("play").style.display = "none";
}

function calcScore(){
    score = 0;
    for (i=0; i < cards.length; i++){
        score = score + cards[i].score;
    }
}

function endGameWinner(){
    resetView();
}

function endGameLoser(){
    resetView();
}

function endGame(){
    resetView();

}

function resetView(){
    document.getElementById("hit").style.display = "none";
    document.getElementById("stay").style.display = "none";
    document.getElementById("play").style.display = "";
}

function renderCards(){

    //remove all created elements
    toRemove = document.getElementsByClassName("created")
    while(toRemove.length > 0){
        toRemove[0].parentNode.removeChild(toRemove[0]);
    }

    //draw score
    scoreText = "Score: "

    if (score > 21){
      scoreText = "You're over, score: "
      endGameLoser();
    } else if (score == 21){
      scoreText = "You Win! Blackjack! Score: "
      endGameWinner()
    }
    var para = document.createElement("p");
    var node = document.createTextNode(scoreText + score);
    para.appendChild(node);
    para.className = "created";
    para.id = "scoreLine";
    var element = document.getElementById("handContent");
    element.appendChild(para);

    //draw all cards
    for (i=0; i < cards.length; i++){
      var para = document.createElement("p");
      cardLabel = i + 1;
      var node = document.createTextNode("Card " + cardLabel + ": " + cards[i].number + " " + cards[i].suit);
      para.appendChild(node);
      para.className = "created";
      var element = document.getElementById("handContent");
      element.appendChild(para);
    }

}

function newCard(){
  //generate random card
  number = Math.floor(Math.random() * (13 - 1 + 1)) + 1
  score = number
  if (score > 10){score = 10};
  if (number == 11){number = "Jack"};
  if (number == 12){number = "Queen"};
  if (number == 13){number = "King"};
  suit = Math.floor(Math.random() * (4 - 1 + 1)) + 1
  if (suit == 1){suit = "Clubs"};
  if (suit == 2){suit = "Diamonds"};
  if (suit == 3){suit = "Hearts"};
  if (suit == 4){suit = "Spades"};
  var card = {suit:suit, score:score, number:number};
  return card;
}

document.getElementById("play").addEventListener("click", play);
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stay").addEventListener("click", stay);

document.getElementById("hit").style.display = "none";
document.getElementById("stay").style.display = "none";
document.getElementById("handTitle").style.display = "none";




