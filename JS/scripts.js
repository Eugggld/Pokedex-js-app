let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let modalContainer = document.querySelector('#modal-container');

  function showModal(name, height, imageUrl, type) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    console.log(type);

    let modalTitle = name
    let text = `Height: ${height}`
    //console.log(pokemon)

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'CLOSE';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = modalTitle;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let modalPokemonImg = document.createElement('img'); //add pokemon image in modal
  modalPokemonImg.src = imageUrl;

    let types = document.createElement('p'); //empty parapraph type
    types.innerText = type[0].type.name; //to get the value on index 0. To display all: loop.




    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);

    modalContainer.appendChild(modal);

    modal.appendChild(modalPokemonImg);

    modal.appendChild(types); //this appends the type to the Modal on line 31

    modalContainer.classList.add('is-visible');
  }

  let dialogPromiseReject; // This can be set later, by showDialog

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
    showModal(title, text);

    // We want to add a confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });
      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });



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
    loadDetails(pokemon).then(function () {
      console.log(pokemon.name);
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl, pokemon.types); // you call that function with that parameter
    });
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
