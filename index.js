
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const data = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

//add event listeners
searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('change', displayMatches);

function makeRequest(url) {
  return new Promise( (resolve, reject) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onload = (event) => {
      if(httpRequest.status !== 200) {
        return reject(new Error(`Status code ::: ${httpRequest.status}`));
      }
      return resolve(httpRequest.responseText);
    }
    httpRequest.open('GET', url);
    httpRequest.send();

  });
};

makeRequest(endpoint)
  .then(result => data.push(...JSON.parse(result)))
  .catch(err => console.log(error));


function filterForMatch(word, cities) {
  return cities.filter(city => {
    const regex = new RegExp(word, 'gi');
    return city.city.match(regex) || city.state.match(regex);
  });
}

function displayMatches() {
  const filtered = filterForMatch(this.value, data);
  suggestions.innerHTML = '';



  const frag = document.createDocumentFragment();

  filtered.forEach( city => {
    // const regex = new RegExp(this.value, 'gi');
    // const cityName = city.city.replace(regex, `<span class="hl">${city.city}</span>`);

    const li = document.createElement("li");
    const detail = `<span class="details">${city.city}, ${city.state}</span>`;
    const population = `<span class="population">${city.population}</span>`;
    li.innerHTML += detail + population;
    frag.appendChild(li);
  });

  suggestions.appendChild(frag);
}


