const pokemon = {name: "Pikachu"}
const pokeContainer = document.getElementById("poke-container");
const pokeForm = document.getElementById("poke-form");
const pokeCard = document.getElementById('poke-1') // Console.log this
// Can also use debugger here 

function renderPokemon(pokemon) {
  // Add a debugger here and investigate pokemon
  const pokeCard = document.createElement("div");
  pokeCard.id = `poke-${pokemon.id}`;
  pokeCard.className = "poke-card";

  const pokeImg = document.createElement("img");
  pokeImg.src = pokemon.img;
  pokeImg.alt = `${pokemon.name} image`;

  const pokeName = document.createElement("h3");
  pokeName.textContent = pokemon.name;

  const pokeLikes = document.createElement("h3");
  pokeLikes.textContent = "Likes: ";

  const likesNum = document.createElement("h5");
  likesNum.className = "like-num";
  likesNum.textContent = pokemon.likes;

  const likeBttn = document.createElement("button");
  likeBttn.className = "like-bttn";
  likeBttn.textContent = "♥";
  likeBttn.addEventListener("click", () => increaseLikes(pokemon, likesNum));

  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "Delete";
  deleteBttn.addEventListener("click", () => deletePoke(pokeCard));

  pokeCard.append(pokeImg, pokeName, pokeLikes, likesNum, likeBttn, deleteBttn);
  pokeContainer.appendChild(pokeCard);
}

function createPokemon(event) {
  event.preventDefault();
  const name = document.querySelector("#name-input").value;
  const img = event.target.querySelector("#img-input").value;

  const pokemon = {
    name: name,
    img: img,
    likes: 0,
    id: 6, // NEEDS TO CHANGE
  };
  renderPokemon(pokemon);
  pokeForm.reset();
}

function increaseLikes(pokemon, likesNum) {
  ++pokemon.likes;
  likesNum.textContent = pokemon.likes;
}

function deletePoke(card) {
  card.remove();
}

function getPokemons() {
  fetch("http://localhost:3000/pokemons")
    .then(function (response) {
      return response.json;
    }
    .then(function (pokemonsArray) {
      pokemon.forEach(function (pokemon) {
        renderPokemon(pokemon);
      });
    })
}

function init() {
  getPokemons();
  pokeForm.addEventListener("submit", createPokemon);
}

init();
