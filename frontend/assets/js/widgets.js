document.body.onload = async () => {
  await header();
  await matchWidget();
  await bannerWidget();
  await newsWidget();
  await vodsWidget();
}


async function matchWidget() {
  var url = 'http://localhost:5050/api/v1/matches';
  const request = await fetch(url);
  const json = await request.json();
  if(json.length == 0){
    document.querySelector('.match-widget').style.display = "none";
  }else{
    document.querySelector('.match-container').innerHTML = "";
    for(var i = 0; i < json.length; i++){
      const match = {
        local: await teams(json[i].local.id),
        visitor: await teams(json[i].visitor.id),
        league: await leagues(json[i].league.id),
        date: json[i].match_time,
      }
      
    }
  }
  logger('info', 'Matches -> Loaded');
  
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




// LAST DONE: Create game constructor


async function teams(id) {
  const consult = await fetch(`http://localhost:5050/api/v1/teams/${id}`);
  const team = await consult.json();
  const response = {
    name: team[0].name,
    acronym: team[0].acronym.name,
    logo_url: team[0].logo.logo_url,
  }
  return response;
}

async function leagues(id) {
  const consult = await fetch(`http://localhost:5050/api/v1/leagues/${id}`);
  const league = await consult.json();
  const response = {
    name: league[0].name,
    logo_url: league[0].logo.logo_url,
  }
  return response;
}