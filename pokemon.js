// Max ammout of pokemon retrieved from the api
const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

//Fetch the pokemon data using the pokeapi
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        allPokemons = data.results;
    });

/* 
    Retrive the data before the page loads 
    using an asyncronous function that 
    blocks the code until the function finishes.
*/
async function fetchPokemonDataBeforeRedirect(id) {
    try {
        const [pokemon, pokemonSpecies] =  await Promise
        .all([
            // Fetch by id
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(
                (res) => {
                    res.json()
                }
            ),
            // Fetch species
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(
                (res) => {
                    res.json()
                }
            ),
        ])
    return true;
    } catch (error) {
        console.error("Failed to fetch Pokemon data before redirect")
    }
}