let pokemonList = [
  {name: 'Charmander', height:0.6, type: ['fire']},
  {name: 'Charmeleon', height:3.07, type: ['fire']},
  {name: 'Charizard', height:5.07, type: ['fire','flying']},
];

//Listing the name and height of each pokemon in the array. Making Names and one Height visible on Output.
//Adding for Loop and if Conditional.
//Adapting changes after Correction Task.
for (let i = 0;i < pokemonList.length;i++){
  if (pokemonList[i].height > 5.0) document.write("<br><br>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, thats tall!" + "<br>");
  else document.write("<br><br>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
}
