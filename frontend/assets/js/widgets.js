document.body.onload = async () => {
  await header();
  await matchWidget();
  await bannerWidget();
  await newsWidget();
  await vodsWidget();
}


function matchWidget() {
  const screenWidth = document.body.clientWidth;
  const width = document.querySelectorAll('.match').length * 150;
  const moveTimes = Math.trunc(width/screenWidth);
  if (moveTimes < 1 || moveTimes == 0) {
    document.querySelector('.right-arrow').style = "display:none";
  }
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

function matchMovement(s){
  const screenWidth = document.body.clientWidth;
  const width = document.querySelectorAll('.match').length * 150;
  const container = document.querySelector('.match-container');
  const position = container.getBoundingClientRect().left;
  
  const moveTimes = Math.trunc(width/screenWidth);
  const maxMove = -width*moveTimes

  console.log(maxMove);
  if(screenWidth < 721){
    if (s == 'right') {
      if (position > maxMove) {
        container.scrollBy(150,0)
      }
      
    }
  } else if (screenWidth < 1075){
    if (s == 'right') {
      if (position > maxMove) {
        container.style = `left: ${position-(150*2)}px`
      }
      
    }
  }else{

  }

  logger('debug', moveTimes);
  logger('debug',screenWidth);
  logger('debug', position);
  logger('debug',width);
}

function settings(){
  console.log('settings');
}