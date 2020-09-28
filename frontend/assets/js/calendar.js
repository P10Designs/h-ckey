document.body.onload = async () => {
  await header();
  await builder();
  await listener();
  await clicked(1);
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

async function listener(){
  const leagues = document.querySelectorAll('.league');
  for(var i = 0; i<leagues.length; i++){
    const pass = i+1;
    leagues[i].addEventListener('click',() => {
      clicked(pass);
    });
  }
  document.querySelector('.adviser').addEventListener('click', ()=>{
    window.scrollBy({top:-250, behavior:'smooth'});
  });
  document.querySelector('.span').addEventListener('click', ()=> {
    if(document.body.clientWidth < 1024){
      if (document.querySelector('.selector').style.display == "flex") {
        document.querySelector('.selector').style.display = 'none';
        document.querySelector('.calendar-content').style.display = 'flex';
      }else{
        document.querySelector('.selector').style.display = 'flex';
        document.querySelector('.calendar-content').style.display = 'none';
      }
    }
  })
}

async function clicked(id) {
  document.querySelector('#preloader').style.display= ""
  for (var i = 0; i < document.querySelectorAll('.league').length; i++) {
    if (i!=(id-1)){
      document.querySelectorAll('.league')[i].className = 'league';
    }else{
      document.querySelectorAll(`.league`)[i].className = 'league selected';
    }
  }
  await oldContent(id);
  document.querySelector('#preloader').style= "display:none;"
}

async function oldContent(id){
  const url = 'http://localhost:5050/api/v1/matches/league/'+id;
  const request = await fetch(url)
  const json = await request.json();
  document.querySelector('.old').innerHTML = "";
  document.querySelector('.new').innerHTML = "";
  var beforeOld = ""
  var beforeNew = ""
  for(var i = 0; i<json.length;i++){
    if (json[i].played) {
      const match = {
        time: await date(json[i].match_time),
        local: await teams(json[i].local.id),
        visitor: await teams(json[i].visitor.id),
        vod:  json[i].vod,
      }
      if(beforeOld != match.time.date){
        beforeOld = match.time.date;
        document.querySelector('.old').innerHTML += `<div class="dayStarter">${match.time.date}</div> `;
      }
      if (match.vod.local_result>match.vod.visitor_result) {
        const add = `<a href="${match.vod.video_url}" class="match">
        <div class="time">
          <div class="handler">
            <span class="hours">${match.time.hours}</span>
            <span class="minutes">${match.time.minutes}</span>
          </div>
        </div>
        <div class="data">
          <div class="team winner">
            <img src="${match.local.logo_url}" alt="local">
            <div class="name">${match.local.name}</div>
          </div>
          <div class="result">
            <!--<div class="arrow" style="color:#b19955 ;">
              &#9658;
            </div>-->
            <div class="arrow left">
              &#9668;
            </div>
            <div class="numbers left">
              <span class="local-result winner">${match.vod.local_result}</span>
              <span class="dash">-</span>
              <span class="visitor-result">${match.vod.visitor_result}</span>
            </div>
          </div>
          <div class="team">
            <img src="${match.visitor.logo_url}" alt="visitor">
            <div class="name">${match.visitor.name}</div>
          </div>
        </div>
        <div class="useless"></div>
      </a>`;
      document.querySelector('.old').innerHTML += add;
      } else if (match.vod.local_result<match.vod.visitor_result) {
        const add = `<a href="${match.vod.video_url}" class="match">
        <div class="time">
          <div class="handler">
            <span class="hours">${match.time.hours}</span>
            <span class="minutes">${match.time.minutes}</span>
          </div>
        </div>
        <div class="data">
          <div class="team">
            <img src="${match.local.logo_url}" alt="local">
            <div class="name">${match.local.name}</div>
          </div>
          <div class="result">
            <div class="numbers right">
              <span class="local-result">${match.vod.local_result}</span>
              <span class="dash">-</span>
              <span class="visitor-result winner">${match.vod.visitor_result}</span>
            </div>
            <div class="arrow right" style="color:#b19955 ;">
              &#9658;
            </div>
          </div>
          <div class="team winner">
            <img src="${match.visitor.logo_url}" alt="visitor">
            <div class="name">${match.visitor.name}</div>
          </div>
        </div>
        <div class="useless"></div>
      </a>`;
      document.querySelector('.old').innerHTML += add;
      }else {
        const add = `<a href="${match.vod.video_url}" class="match">
        <div class="time">
          <div class="handler">
            <span class="hours">${match.time.hours}</span>
            <span class="minutes">${match.time.minutes}</span>
          </div>
        </div>
        <div class="data">
          <div class="team">
            <img src="${match.local.logo_url}" alt="local">
            <div class="name">${match.local.name}</div>
          </div>
          <div class="result">
            <div class="numbers">
              <span class="local-result">${match.vod.local_result}</span>
              <span class="dash">-</span>
              <span class="visitor-result">${match.vod.visitor_result}</span>
            </div>
          </div>
          <div class="team">
            <img src="${match.visitor.logo_url}" alt="visitor">
            <div class="name">${match.visitor.name}</div>
          </div>
        </div>
        <div class="useless"></div>
      </a>`;
      document.querySelector('.old').innerHTML += add;
      }
      
    }else{
      const match = {
        time: await date(json[i].match_time),
        local: await teams(json[i].local.id),
        visitor: await teams(json[i].visitor.id),
      }
      if(beforeNew != match.time.date){
        beforeNew = match.time.date;
        document.querySelector('.newl').innerHTML += `<div class="dayStarter">${match.time.date}</div> `;
      }
      const add = `<div class="match">
      <div class="time">
        <div class="handler">
          <span class="hours">${match.time.hours}</span>
          <span class="minutes">${match.time.minutes}</span>
        </div>
        <span class="aprox">APROX.</span>
      </div>
      <div class="data">
        <div class="team">
          <img src="${match.local.logo_url}" alt="local">
          <div class="name">${match.local.name}</div>
        </div>
        <span class="vs">vs.</span>
        <div class="team">
          <img src="${match.visitor.logo_url}" alt="local">
          <div class="name">${match.visitor.name}</div>
        </div>
      </div>
      <div class="useless"></div>
    </div>`;
      document.querySelector('.new').innerHTML += add;
      
    }
  }
  if (document.querySelector('.new').childNodes.length == 0) {
    document.querySelector('.new').innerHTML = `<div class="dayStarter">No hay partidos programados para tu selección.</div>`
    scrolled(300);
  }else{scrolled(300);}
  if (document.querySelector('.old').childNodes.length == 0) {
    document.querySelector('.adviser').style.display = 'none';
    scrolled(0)
  }
  
}

function scrolled(add) {
  if (add==0){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  }else{
    const x = document.querySelector('.new').offsetTop + add;
    window.scrollTo({
      top: x,
      behavior: 'smooth',
    }); 
  }
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

async function date(date) {
  var given = new Date(date)
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
  if (given.getUTCMinutes()<10){
    const min = `0${given.getUTCMinutes()}`; 
    var array
    const response = {
      hours: given.getUTCHours(),
      minutes: min,
      date: `${weekday[given.getUTCDay()]}, ${given.getUTCDate()} de ${month[given.getUTCMonth()]}`
    }
    return response;
  }else{
    const response = {
      hours: given.getUTCHours(),
      minutes: given.getUTCMinutes(),
      date: `${weekday[given.getUTCDay()]}, ${given.getUTCDate()} de ${month[given.getUTCMonth()]}`
    }
    return response;
  }
 
  
}
