const elMoviesList = selectElement(".movies__list");
const elMovieTemplate = selectElement("#movie-template").content;
const elSelect = document.getElementById("gender-filter");
const form = selectElement(".filter-form");

function renderGenresList(genre, element) {
  const newLi = createDOM("li");
  newLi.className = "movie-card__genre badge";
  newLi.textContent = genre;
  element.append(newLi);
}

function renderMoviesList(moviesArr, element) {
  elMoviesList.innerHTML = null;

  moviesArr.forEach((item) => {
    const movieTemplate = elMovieTemplate.cloneNode(true);

    selectElement(".movie-card__poster", movieTemplate).src = item.poster;
    selectElement(".movie-card__link", movieTemplate).textContent = item.title;
    selectElement(".movie-card__overview", movieTemplate).textContent =
      item.overview;

    item.genres.forEach((genre) => {
      renderGenresList(
        genre,
        selectElement(".movie-card__genres", movieTemplate)
      );
    });

    element.append(movieTemplate);
  });
}

const gener = [];

films.forEach((film) => {
  film.genres.forEach((genre) => {
    if (!gener.includes(genre)) {
      gener.push(genre);
    }
  });
});

function renderGenresSelect(arr) {
  arr.forEach((item) => {
    const generSelect = selectElement(".filter-form__select");
    const newGenreOption = createDOM("option");
    newGenreOption.textContent = item;
    newGenreOption.value = item;
    generSelect.append(newGenreOption);
  });
}
renderGenresSelect(gener);
renderMoviesList(films, elMoviesList);
function filterMovies(e) {
  e.preventDefault();

  elMoviesList.innerHTML = "";
  const genderName = elSelect.value.replace("_", " ");
  if (genderName === "All" || genderName === "") {
    renderMoviesList(films.genres);
    renderMoviesList(films.genres.filter((film) => film.value === elSelect.value))
    console.log();
  }
}
form.addEventListener("submit", filterMovies);

const searchForm = selectElement(".search__form");
const inputElement = selectElement(".input__element");
const inputBtn = selectElement(".submit__btn");

function getMovie(e) {
  e.preventDefault();
  const regex = new RegExp(inputElement.value, "gi");
  const searchedFilms = films.filter((film) => !!film.title.match(regex));
  console.log(searchedFilms);
  renderMoviesList(searchedFilms, elMoviesList)
}
searchForm.addEventListener("submit", getMovie);