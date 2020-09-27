document.body.onload = async () => {
  await header();
  await builder();
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