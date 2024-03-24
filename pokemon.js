function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  async function fetchPokemon(url) {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonDiv = document.createElement('div');
    pokemonDiv.id = data.name;
    pokemonDiv.classList.add('pokemon');

    const id = data.id;
    const pId = document.createElement('p');
    pId.classList.add('pid');
    pId.appendChild(document.createTextNode(`${pad(id, 3)}`)); 
    pokemonDiv.appendChild(pId);

    const image = document.createElement('img');
    image.src = data.sprites.front_default;
    pokemonDiv.appendChild(image);

    const pName = document.createElement('p');
    pName.classList.add('name');
    pName.style.textTransform = 'uppercase'; 
    pName.style.fontWeight = 'bold'; 
    pName.appendChild(document.createTextNode(data.name));
    pokemonDiv.appendChild(pName);

    const types = data.types.map(type => type.type.name).join(' / ');
    const pType = document.createElement('p');
    pType.classList.add('type');
    pType.style.textTransform = 'capitalize'; 
    pType.appendChild(document.createTextNode(types));
    pokemonDiv.appendChild(pType);

    document.getElementById('pokemons').appendChild(pokemonDiv);
  }

  async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    const data = await response.json();

    for (const pokemon of data.results) {
      const pokemonResponse = await fetchPokemon(pokemon.url);
    }
  }

  fetchPokemons();