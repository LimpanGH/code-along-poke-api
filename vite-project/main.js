import axios from 'axios';

// Exempel på data vi ska hämta ut -------------
// "results": [
//   {
//     "name": "bulbasaur",
//     "url": "https://pokeapi.co/api/v2/pokemon/1/"
//   },
//   {
//     "name": "ivysaur",
//     "url": "https://pokeapi.co/api/v2/pokemon/2/"
//   },
//   {

// Hämtningsfunktion
async function getPokemonList() {
  try {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=20'
    );
    // console.log(response.data.results);
    return response.data.results;
  } catch {
    console.error('Error fectching pokemon list', err.message);
    return []; // returnerar en tom array om man inte får nåt response
  }
}
getPokemonList();

async function getPokemonDetails(pokemonName) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    console.log(response.data);
    const data = response.data;
    // console.log(response.data.base_experience)
    // console.log(response.data.abilities[0].ability.name)
    // console.log(response.data.abilities[1].ability.name)

    const abilities = data.abilities.map((item) => item.ability.name);
    const base_experience = data.base_experience;
    console.log(abilities, base_experience);

    console.log(abilities);
  } catch (err) {
    console.error('Error fetching pokemon details', err.message);
  }
}

// Denna funktion ansvarar för att rendera ut pokemon-info i varje pokemonkort
function renderPokemonCards(pokemonList) {
  // const data = await pokemonList
  // console.log(data);

  const cardsContainer = document.querySelector('.pokemon-cards-container');
  cardsContainer.innerHTML = pokemonList
    .map((pokemon, index) => {
      return `
  <article class="pokemon-card">
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
     index + 1
   }.png"> 
   <h2>${pokemon.name}</h2>
   <p>Abilities: TODO</p>
   <p>Base Experience: </p>
   </article>
   `;
    })
    .join('');
}

async function main() {
  const pokemonList = await getPokemonList();
  // Köra function som renderar ut pokemon-card data.
  renderPokemonCards(pokemonList);
  const data = getPokemonDetails('pikachu');
  console.log('pokemon details', data);
}

main();
