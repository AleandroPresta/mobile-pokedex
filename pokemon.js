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
        displayPokemons(allPokemons);
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

function displayPokemons(pokemon) {
    listWrapper.innerHTML = "";

    pokemon.forEach(
        (pokemon) => {
            // Parsing the URL to take the pokemon ID
            const pokemonId = pokemon.url.split("/")[6];
            // Creating the HTML item to visualize the pokemon
            const listItem = document.createElement("div");
            listItem.className = "listItem";
            listItem.innerHTML = `
            <div class="number-wrap">
                <p class="caption-fonts">#${pokemonId}</p>
            </div>
            <div class="image-wrap">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt="Pokemon image"/>
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">#${pokemon.name}</p>
            </div>
            `;

            // Redirecting the user to a page that visualizes the info of the single pokemon when clicking on a pokemon
            listItem.addEventListener("click", async () => {
                const success = await fetchPokemonDataBeforeRedirect(pokemonId);

                if (success) {
                    window.location.href = `./detail.html?id=${pokemonId}`;
                }

            });

            // Appending the created item on the page
            listWrapper.appendChild(listItem);
        }
    )
}

// Handeling the search functionality
searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPokemons;

    // Search by number
    if (numberFilter.checked) {
        filteredPokemons = allPokemons.filter(
            (pokemon) => {
                const pokemonId = pokemon.url.split("/")[6];
                return pokemonId.startsWith(searchTerm);
            }
        )
    // Search by name
    } else if (nameFilter.checked) {
        filteredPokemons = allPokemons.filter(
            (pokemon) => {
                const pokemonName = pokemon.name.toLowerCase();
                return pokemonName.startsWith(searchTerm);
            }
        );
    } else {
        filteredPokemons = allPokemons;
    }

    displayPokemons(filteredPokemons);

    if (filteredPokemons.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}