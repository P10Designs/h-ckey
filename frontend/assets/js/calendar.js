document.body.onload = async () => {
  await header();
  await builder();
  await listener();
  clicked(1);
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

function clicked(id) {
  console.log(id);
}

function constructor(){
  
}