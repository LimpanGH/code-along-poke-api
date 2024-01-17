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
  } catch (err) {
    console.error('Error fectching pokemon list', err.message);
    return []; // returnerar en tom array om man inte får nåt response
  }
}

async function getPokemonDetails(pokemonName) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    // console.log(response.data);
    const data = response.data;
    // console.log(response.data.base_experience)
    // console.log(response.data.abilities[0].ability.name)
    // console.log(response.data.abilities[1].ability.name)

    const abilities = data.abilities.map((item) => item.ability.name);
    const base_experience = data.base_experience;
    // console.log(abilities, base_experience);

    return {
      // abilities: abilities,
      // base_experience: base_experience   -- samma sak som nedan
      abilities,
      base_experience,
    };

    // console.log(abilities);
  } catch (err) {
    console.error('Error fetching pokemon details', err.message);
    return {
      abilities: [],
      base_experience: null,
    };
  }
}

// Denna funktion ansvarar för att rendera ut pokemon-info i varje pokemonkort
async function renderPokemonCards(pokemonList) {
  // const data = await pokemonList
  // console.log(data);
  const cardsContainer = document.querySelector('.pokemon-cards-container');

  const completePokeonList = await Promise.all(
    pokemonList.map(async (pokemon, index) => {
      const { abilities, base_experience } = await getPokemonDetails(
        pokemon.name
      ); // destructering
      return {
        // samla komplett info om en pokemon(name, index, abilites, base_exp)
        name: pokemon.name,
        abilities: abilities,
        base_experience: base_experience,
        index: index,
      };
    })
  );

  console.log(completePokeonList);

  //Filtrera,sortera...

  cardsContainer.innerHTML = completePokeonList
    .map((pokemon, index) => {
      return `
  <article class="pokemon-card">
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
     index + 1
   }.png"> 
   <h2>${pokemon.name}</h2>
   <p>Abilities: ${pokemon.abilities.join(', ')}</p> 
   <p>Base Experience: ${pokemon.base_experience}</p>
   </article>
   `;
    })
    .join('');
}

async function main() {
  const pokemonList = await getPokemonList();
  // Köra function som renderar ut pokemon-card data.
  renderPokemonCards(pokemonList);
  const data = await getPokemonDetails('pikachu');
  // console.log('pokemon details', data);
}

main();
