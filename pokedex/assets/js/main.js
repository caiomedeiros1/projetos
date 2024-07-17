
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#00${pokemon.number}</span>
                <span class="name">${capitalize(pokemon.name)}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${capitalize(type)}</li>`).join('')}
                    </ol>
    
                    <img src="/imagens-pokemon/${pokemon.name}.png" alt="${pokemon.name}">
                </div>
            </li>
        `).join('') 
    }) 
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else {
        loadPokemonItems(offset, limit)
    }
    
})