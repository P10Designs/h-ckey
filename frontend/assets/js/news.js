document.body.onload = async () => {
  await header();
  await loader();
  document.querySelector('#preloader').style= "display:none;"
}

async function loader() {
  var url = 'http://localhost:5050/api/v1/news';
  const request = await fetch(url);
  const json =  await request.json();
  document.querySelector('#title').innerHTML = `Resultados (${json.length})`
  var column = 1;
  document.getElementById(1).innerHTML = ""
  document.getElementById(2).innerHTML = ""
  for(var i = 0; i < json.length; i++){
      const data = {
        img: json[i].image_url,
        url: json[i].new_url,
        type: json[i].type.name,
        name:json[i].name,
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
    </div>`;
    if (column==1) {
      column = 2;
    } else if (column==2){
      column = 1;
    }
  }
  if(document.getElementById(1).childNodes.length == 0){
    document.querySelector('.wrapper').style = ` display:flex; color:#fff;align-items:center; justify-content:center;`;
    document.querySelector('.wrapper').innerHTML = `<div style="padding:30px;height:70vh;font-weight:bold;font-size:large;">No hay noticias para mostrar.</div>`;
  }
  logger('info','News -> Loaded');

}