let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon NOT correct!");
    }
  }
  function getAll() {
    return pokemonList;
  }
  // This code will create li and button for pokemonList.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector ('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon); //add event listener. Listen to click. Call showDetails as handler function. Thus you pass the pokemon object as a paramenter when a pokemon is clicked. Should be same parameter as in addListItem().
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  //A function promise to load pokemon details from external API.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item); //Inside the function, run a console.log() on the Pokémon object that’s passed as the parameter. You’ll do more than just log the data in a later task.
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

/*pokemonRepository.add({ name: 'Pidgeon', height: 1, type: ['flying'] });
pokemonRepository.add({ name: 'Squirtle', height: 1, type: ['water'] });
pokemonRepository.add({ height: 1, type: ['water'] }); //Pokemon NOT correct

console.log( pokemonRepository.getAll() ); */

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  //Listing the name and height of each pokemon in the array. Making Names and one Height visible on Output.
  //Adding for Loop and if Conditional.
  //Adapting changes after Correction Task.

  /* for (let i = 0;i < pokemonList.length;i++){
  if (pokemonList[i].height > 5.0) document.write("<br><br>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, thats tall!" + "<br>");
  else document.write("<br><br>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
} */

/* pokemonList.forEach(function(pokemon) {
console.log(pokemon.name + ' is a size ' + pokemon.height + ' and a type' + pokemon.type);
}); */

/* Object.keys(pokemonList).forEach(function(property) {
console.log(pokemonList[property]);
}); */


/*
pokemonRepository.getAll().forEach(function (pokemon) {
if (pokemon.height > 5.0) document.write("<br><br>" + pokemon.name + " (height: " + pokemon.height + ") - Wow, thats tall!" + "<br>");
else document.write("<br><br>" + pokemon.name + " (height: " + pokemon.height + ")" + "<br>");
});*/

// NO need to add new function. See line 40 and 42:pokemonRepository.add({})
/* function add(name, type) {
console.log(name,type)
document.write("<br><br>Another one is " + name + " and its type is " + type + ".<br>");
}

add('Squirtle', 'water');
add('Pikachu', 'electricity');
add('Pigeon', 'flying');*/
