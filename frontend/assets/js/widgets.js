document.body.onload = async () => {
  await header();
  await matchWidget();
  await bannerWidget();
  await newsWidget();
  await vodsWidget();
}


function matchWidget() {
  document.querySelector('.left-arrow').addEventListener('click', () => matchMovement('left'));
  document.querySelector('.left-arrow').style = "display: none";
  document.querySelector('.right-arrow').addEventListener('click', () => matchMovement('right'));
  document.querySelector('.settings').addEventListener('click', settings);
  logger('info','Matches -> Loaded');
}
function bannerWidget() {
  logger('info','Banner -> Loaded');

}
function newsWidget() {
  logger('info','News -> Loaded');
}
function vodsWidget() {
  logger('info','Vods -> Loaded');

}

// FUNCTION MATCH MOVEMENT NEEDS TO BE MADE
function matchMovement(s){
  const screenWidth = document.body.clientWidth;
  const width = document.querySelectorAll('.match').length * 150;
  const container = document.querySelector('.match-container');
  const position = container.getBoundingClientRect().left;
  if (s == 'right'){
    if  (position == 0){
      const movement = `left: ${Math.trunc(screenWidth/width)};`
      container.style = movement
    }
  }
  logger('debug',screenWidth);
  logger('debug', position);
  logger('debug',width);
}

function settings(){
  console.log('settings');
}