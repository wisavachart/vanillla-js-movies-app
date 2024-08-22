const global = {
  curentPage: window.location.pathname,
};

async function disPlayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}1">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />`
                : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
       `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

//Show Spiner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//HighLight Active Link
function highLightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.curentPage) {
      link.classList.add("active");
    }
  });
}

async function fetchAPIData(endpoint) {
  showSpinner();
  const API_KEY = "c34bcb1072187d919532dd291b8483b8";
  const API_URL = "https://api.themoviedb.org/3/";
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  if (data) {
    setTimeout(() => {
      hideSpinner();
    }, 200);
  }
  return data;
}

// Init App
function init() {
  switch (global.curentPage) {
    case "/":
      disPlayPopularMovies();
      break;
    case "/shows.html":
      console.log("shows");
      break;
    case "/movie-details.html":
      console.log("movie-details");
      break;
    case "/tv-details.html":
      console.log("tv-details");
      break;
    case "/tv-details.html":
      console.log("tv-details");
      break;
    case "/search.html":
      console.log("search");
      break;
  }
  highLightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
