document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pet-list");
  const cards = Array.from(container.children);

  // Randomizar orden de mascotas
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  container.innerHTML = "";
  cards.forEach(card => container.appendChild(card));

  // --- Buscador ---
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", filtrar); // 👈 tiempo real

  // --- Filtros ---
  const filterAnimal = document.getElementById("filterAnimal");
  const filterSize = document.getElementById("filterSize");
  const filterSex = document.getElementById("filterSex");
  const filterAge = document.getElementById("filterAge");
  const filterShelter = document.getElementById("filterShelter");

  [filterAnimal, filterSize, filterSex, filterAge, filterShelter].forEach(select => {
    select.addEventListener("change", filtrar);
  });

  // --- Menú hamburguesa (mostrar/ocultar filtros) ---
  const toggleBtn = document.getElementById("toggleFilters");
  const filtersMenu = document.getElementById("filtersMenu");
  toggleBtn.addEventListener("click", () => {
    filtersMenu.classList.toggle("oculto");
  });

  // --- Función de filtrado ---
  function filtrar() {
    const searchTerm = searchInput.value.toLowerCase();
    const animal = filterAnimal.value;
    const size = filterSize.value;
    const sex = filterSex.value;
    const age = filterAge.value;
    const shelter = filterShelter.value;

    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const dataAnimal = card.dataset.animal;
      const dataSize = card.dataset.size;
      const dataSex = card.dataset.sex;
      const dataAge = card.dataset.age;
      const dataShelter = card.dataset.shelter;

      const matchSearch = name.includes(searchTerm);
      const matchAnimal = animal === "" || dataAnimal === animal;
      const matchSize = size === "" || dataSize === size;
      const matchSex = sex === "" || dataSex === sex;
      let ageCategory = "";
      const numericAge = parseFloat(dataAge);

      if (numericAge < 1) {
  ageCategory = "cachorro";
      } else if (numericAge >= 1 && numericAge <= 7) {
      ageCategory = "adulto";
      } else if (numericAge > 7) {
      ageCategory = "senior";
      }

const matchAge = age === "" || ageCategory === age;

      const matchShelter = shelter === "" || dataShelter === shelter;

      if (matchSearch && matchAnimal && matchSize && matchSex && matchAge && matchShelter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }
});
