const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {

  $(".miss").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);

  if (hits===0){
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {

  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  console.log(firstHitTime);
  console.log(getTimestamp());
  console.log(totalPlayedMillis);
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(4);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).removeClass("target");
    $(event.target).text("");
    round();
  }
  else {
    $(event.target).addClass("miss");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {

    location.reload();

  });
}

$(document).ready(init);
