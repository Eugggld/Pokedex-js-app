let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Charmander', height:0.6, type: ['fire']},
    {name: 'Charmeleon', height:3.07, type: ['fire']},
    {name: 'Charizard', height:5.07, type: ['fire','flying']},
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon NOT correct");
    }
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

console.log( pokemonRepository.getAll() );
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

pokemonRepository.add({ name: 'Pigeon', height: 1, type: ['flying'] });

pokemonRepository.add({ name: 'Squirtle', height: 1, type: ['water'] });

pokemonRepository.add({ height: 1, type: ['water'] }); //Pokemon NOT correct

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 5.0) document.write("<br><br>" + pokemon.name + " (height: " + pokemon.height + ") - Wow, thats tall!" + "<br>");
  else document.write("<br><br>" + pokemon.name + " (height: " + pokemon.height + ")" + "<br>");
});

// NO need to add new function. See line 40 and 42:pokemonRepository.add({})
 /* function add(name, type) {
   console.log(name,type)
   document.write("<br><br>Another one is " + name + " and its type is " + type + ".<br>");
 }

 add('Squirtle', 'water');
  add('Pikachu', 'electricity');
   add('Pigeon', 'flying');*/
