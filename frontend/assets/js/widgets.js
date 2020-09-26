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
    var before = "";
    document.querySelector('.match-container').innerHTML = "";
    for(var i = 0; i < json.length; i++){
      if (json[i].played == false){
        const match = {
          local: await teams(json[i].local.id),
          visitor: await teams(json[i].visitor.id),
          league: await leagues(json[i].league.id),
          date: await date(json[i].match_time),
        }
        if (before != match.date.weekday){
          const matches = `<div class="match dayStarter">
            <div class="day">
                <span>${match.date.weekday.toUpperCase()}</span>
              </div>
            <div class="teams">
              <div class="local">
                <img src="${match.local.logo_url}" alt="LOCAL LOGO" class="team-logo">
                <span class="aconimo">${match.local.acronym}</span>
              </div>
              <div class="visitor">
                <img src="${match.visitor.logo_url}" alt="VISIT LOGO" class="team-logo">
                <span class="aconimo">  ${match.visitor.acronym}</span>
              </div>
            </div>
            <div class="league">
              <span>${match.league.name.replace('Liga', '').toUpperCase()}</span>
            </div>
            <div class="time">
              <span>${match.date.time}</span>
            </div>
          </div>`;
          document.querySelector('.match-container').innerHTML +=  matches;
          before = match.date.weekday
        } else {
          const matches = `<div class="match">
            <div class="teams">
              <div class="local">
                <img src="${match.local.logo_url}" alt="LOCAL LOGO" class="team-logo">
                <span class="aconimo">${match.local.acronym}</span>
              </div>
              <div class="visitor">
                <img src="${match.visitor.logo_url}" alt="VISIT LOGO" class="team-logo">
                <span class="aconimo">  ${match.visitor.acronym}</span>
              </div>
            </div>
            <div class="league">
              <span>${match.league.name.replace('Liga', '').toUpperCase()}</span>
            </div>
            <div class="time">
              <span>${match.date.time}</span>
            </div>
          </div>`;
          document.querySelector('.match-container').innerHTML +=  matches;
        }
      }else{
        
      }
    }
  }
  logger('info', 'Matches -> Loaded');
}

async function bannerWidget() {
  logger('info','Banner -> Loaded');
}

async function newsWidget() {
  var url = 'http://localhost:5050/api/v1/news';
  const request = await fetch(url);
  const json = await request.json();
  var column = 1;
  document.getElementById(1).innerHTML = ""
  document.getElementById(2).innerHTML = ""
  for(var i = 0; i < 4; i++){
    try {
      const data = {
        img: json[i].image_url,
        url: json[i].new_url,
        type: json[i].type.name,
        name:json[i].name,
      }
      if (column==1) {
        column = 2;
      } else if (column==2){
        column = 1;
      }
      document.getElementById(column).innerHTML +=  `<div class="new">
      <a href="${data.url}">
        <div class="miniatura">
          <img src="${data.img}" alt="miniatura" class="img">
        </div>
        <div class="text">
          <div class="type">${data.type}</div>
          <div class="new-title">${data.name}</div>
        </div>
      </a>
    </div>`
      console.log(data);
    } catch (error) {
      
    }
  logger('info','News -> Loaded');
}}

async function vodsWidget() { 
  logger('info','Vods -> Loaded');
}


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

async function date(date) {
  var given = new Date(String(date), );
  var today = new Date();

  if((given.getUTCDate() - today.getUTCDate()) < 8){
    var weekday = new Array();
    weekday[0] = "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miercoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sabado";
    var response = {
      weekday: weekday[given.getUTCDay()],
      time: `${given.getHours()}:${given.getMinutes()}`
    }
  }else{
    var month = new Array();
    month[0] = "Enero";
    month[1] = "Feb";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Sept";
    month[9] = "Octu";
    month[10] = "Novi";
    month[11] = "Dici";
    var response = {
     weekday: `${given.getDate()} ${month[given.getMonth()]}`,
     time: `${given.getHours()}:${given.getMinutes()}`
    }
  }
  return response
}

 