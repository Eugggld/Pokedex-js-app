let pokemonRepository = (function() {
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
    button.classList.add("btn"); // instead of the older ("button-class")
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    listPokemon.appendChild(button);
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
        console.log(pokemon.name)
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

  function showDetails(pokemon) { //(instead of item, then Pokemon?)

    console.log(pokemon.name);
    loadDetails(pokemon).then(function () {
      console.log(pokemon.name);
      showModal(pokemon); // you call that function with that parameter
    });
  }


  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('modal-header');

    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating elemnt for name ind Modal contentElement
    let nameElement = $("<h1>" + item.name + "</h1>");
    // // creating img in modal contentElement
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "height : " + item.height + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);

  }


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


let pokemonSearchBar = document.querySelector('#search-input');

pokemonSearchBar.addEventListener('input', function() {
  let pokeItem = document.querySelectorAll('li');
  let filter = pokemonSearchBar.value.toUpperCase();

  pokeItem.forEach(function(pokemon){
    if (pokemon.innerText.toUpperCase().indexOf(filter) === 0) {
      pokemon.style.display = 'block';
    } else {
      pokemon.style.display = 'none';
    }
  });

});
