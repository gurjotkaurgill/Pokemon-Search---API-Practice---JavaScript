const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

document.getElementById("search-button").addEventListener("click", () => {
  const searchValue = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();

  if (!searchValue) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  fetch(`${apiUrl}${searchValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => updateUI(data))
    .catch((error) => {
      alert("Pokémon not found");
    });
});

function updateUI(data) {
  // Set basic info
  document.getElementById("pokemon-name").innerText = data.name.toUpperCase();
  document.getElementById("pokemon-id").innerText = `#${data.id}`;
  document.getElementById("weight").innerText = `Weight: ${data.weight}`;
  document.getElementById("height").innerText = `Height: ${data.height}`;

  // Update sprite
  const spriteContainer = document.getElementById("sprite-container");
  spriteContainer.innerHTML = "";
  const sprite = document.createElement("img");
  sprite.id = "sprite";
  sprite.src = data.sprites.front_default;
  sprite.alt = data.name;
  spriteContainer.appendChild(sprite);

  // Update types
  const typesContainer = document.getElementById("types");
  typesContainer.innerHTML = "";
  data.types.forEach((type) => {
    const typeElement = document.createElement("span");
    typeElement.innerText = type.type.name.toUpperCase();
    typesContainer.appendChild(typeElement);
  });

  // Update stats
  document.getElementById("hp").innerText = data.stats[0].base_stat;
  document.getElementById("attack").innerText = data.stats[1].base_stat;
  document.getElementById("defense").innerText = data.stats[2].base_stat;
  document.getElementById("special-attack").innerText =
    data.stats[3].base_stat;
  document.getElementById("special-defense").innerText =
    data.stats[4].base_stat;
  document.getElementById("speed").innerText = data.stats[5].base_stat;
}