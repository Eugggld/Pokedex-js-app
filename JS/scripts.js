let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Charmander',
    height:0.6,
    type: ['fire']
  },
  { name: 'Charmeleon',
  height:3.07,
  type: ['fire']
},
{
  name: 'Charizard',
  height:5.07,
  type: ['fire','flying']
},
];

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "type" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("Pokemon NOT correct!");
  }
}
function getAll() {
  return pokemonList;
}

function addListItem(pokemon){
  let pokemonList = document.querySelector ('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  //button.addEventListener("click", function(event) {
    //showDetails(pokemon); //add event listener. Listen to click. Call showDetails as handler function. Thus you pass the pokemon object as a paramenter when a pokemon is clicked. Should be same parameter as in addListItem().
  }

  function showDetails(pokemon){
    console.log(item); //Inside the function, run a console.log() on the Pokémon object that’s passed as the parameter. You’ll do more than just log the data in a later task.
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

pokemonRepository.add({ name: 'Pidgeon', height: 1, type: ['flying'] });
pokemonRepository.add({ name: 'Squirtle', height: 1, type: ['water'] });
pokemonRepository.add({ height: 1, type: ['water'] }); //Pokemon NOT correct

console.log( pokemonRepository.getAll() );


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
