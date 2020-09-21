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
const team = await teams(21);