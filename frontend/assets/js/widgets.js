document.body.onload = async () => {
  await header();
  await matchWidget();
  await bannerWidget();
  await newsWidget();
  await vodsWidget();
}


function matchWidget() {
  var url = 'http://localhost:5050/api/v1/matches'
  fetch(url)
  .then(response => 
    response.json().then(res => ({
        data: res,
        status: response.status
    })
  ).then(res => {
    console.log(res)}));   
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

function settings(){
  console.log('settings');
} 