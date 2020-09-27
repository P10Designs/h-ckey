document.body.onload = async () => {
  await header();
  await builder();
  await listeners();
  document.querySelector('#preloader').style= "display:none;"
}

async function builder() {
  const url = 'http://localhost:5050/api/v1/leagues';
  const request = await fetch(url)
  const json = await request.json();
  for(var i = 0; i < json.length; i++){
    const league = {
      id: json[i].id,
      name: json[i].name,
      logo_url: json[i].logo.logo_url,
    }
    const add = `<div class="league" id="${league.id}">
            <div class="logo">
              <img src="${league.logo_url}" alt="${league.name}">
            </div>
            <div class="name">${league.name}</div>
          </div>`;
    document.querySelector('.selector').innerHTML += add;
  }
  logger('info','Vods -> Loaded');
}

async function listeners(){
  const leagues = document.querySelectorAll('.league');
  for(var i = 0; i<leagues.length; i++){
    const pass = i+1;
    leagues[i].addEventListener('click',() => {
      clicked(pass);
    });
  }
  document.querySelector('.title-small').addEventListener('click', () => {
    if (document.querySelector('.selector').style.display == "flex") {
      document.querySelector('.selector').style.display = 'none';
      document.querySelector('.container').style.display = 'flex';
    }else{
      document.querySelector('.selector').style.display = 'flex';
      document.querySelector('.container').style.display = 'none';
    }
  });
  clicked(1);
}

async function clicked(id) {
  for (var i = 0; i < document.querySelectorAll('.league').length; i++) {
    if (i!=(id-1)){
      document.querySelectorAll('.league')[i].className = 'league';
    }else{
      document.querySelectorAll(`.league`)[i].className = 'league selected';
    }
  }
  document.querySelector('.container').innerHTML = `<div id="preloader-container">
  <div class="sk-three-bounce">
    <div class="sk-child sk-bounce1"></div>
    <div class="sk-child sk-bounce2"></div>
    <div class="sk-child sk-bounce3"></div>
  </div>
  </div>`;
  const url = `http://localhost:5050/api/v1/vods/league/${id}`;
  const request = await fetch(url);
  const json = await request.json();
  if(document.body.clientWidth < 1024){
    if (document.querySelector('.selector').style.display == "flex") {
      document.querySelector('.selector').style.display = 'none';
      document.querySelector('.container').style.display = 'flex';
    }else{
      document.querySelector('.selector').style.display = 'flex';
      document.querySelector('.container').style.display = 'none';
    }
  }
  if (request.status == '600') {
    document.querySelector('.container').innerHTML += '<div class="dayStarter" style="padding:30px; height:80vh;">No hay partidos para mostrar.</div>';
  }else{
    var before = "";
    for(var i=0; i<json.length; i++){
      const vod = {
        local: await teams(json[i].local.id),
        visitor: await teams(json[i].visitor.id),
        video_url: json[i].video_url,
        date: await date(json[i].match_date),
      }
      const given = `${vod.date.day} ${vod.date.month}`;
      if(before != given){
        before = given;
        document.querySelector('.container').innerHTML += ` <div class="dayStarter">${vod.date.weekday}, ${vod.date.day} de ${vod.date.month}</div>`;
      }
      document.querySelector('.container').innerHTML += `<a href="${vod.video_url}" class="vod">
      <div class="local">
        <div class="local-name">${vod.local.acronym}</div>
        <img src="${vod.local.logo_url}" alt="local">
      </div>
      <div class="text">vs.</div>
      <div class="visitor">
        <img src="${vod.visitor.logo_url}" alt="visitor">
        <div class="visitor-name">${vod.visitor.acronym}</div>
      </div>
    </a>`
    }
    
  }
  document.querySelector('#preloader-container').style.display = 'none';
}


async function date(date) {
  var given = new Date(String(date), );
  var weekday = new Array();
    weekday[0] = "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miercoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sabado";
  var month = new Array();
  month[0] = "Enero";
  month[1] = "Febrero";
  month[2] = "Marzo";
  month[3] = "Abril";
  month[4] = "Mayo";
  month[5] = "Junio";
  month[6] = "Julio";
  month[7] = "Agosto";
  month[8] = "Septiembre";
  month[9] = "Octubre";
  month[10] = "Noviembre";
  month[11] = "Diciembre";
  var response = {
    day: given.getUTCDate(),
    month: month[given.getMonth()],
    weekday: weekday[given.getUTCDay()],
  }
  return response
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

