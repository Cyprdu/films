// Consts
const imgPath = "./images/"; // Assurez-vous que vos images sont dans ce dossier

const categories = [
    { id: 1, name: "Action" },

];

const moviesData = {
    1: [
        { id: 101, title: "Mission : Impossible - Dead Reckoning", backdrop: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bdYbHxECXsN169pVrTz2TobFqXb.jpg", release_date: "12/07/2023", overview: "Votre mission si toutefois vous l'acceptez..." },
    ]
};

// Boots up the app
function init() {
    fetchTrendingMovies();
    buildAllSections();
}

function fetchTrendingMovies() {
    const allMovies = Object.values(moviesData).flat();
    const randomIndex = Math.floor(Math.random() * allMovies.length);
    buildBannerSection(allMovies[randomIndex]);
}

function buildBannerSection(movie) {
    const bannerCont = document.getElementById('banner-section');
    bannerCont.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/hwinghcRR7ZJ6nqZJwd1KGZtTMn.jpg')`;
    const div = document.createElement('div');
    div.innerHTML = `
        <h2 class="banner__title">${movie.title}</h2>
        <p class="banner__info">Action - Suspense - ${movie.release_date}</p>
        <p class="banner__overview">${movie.overview}</p>
        <div class="action-buttons-cont">
<button class="action-button" onclick="window.location.href='/missionimpossiblep1';">Lecture</button>
<button class="action-button" onclick="window.location.href='https://www.missionimpossible-lefilm.fr/synopsis/';">Plus d'informations...</button>
        </div>
    `;
    div.className = "banner-content container";
    bannerCont.append(div);
}

function buildAllSections() {
    categories.forEach(category => {
        buildMoviesSection(moviesData[category.id], category.name);
    });
}

function buildMoviesSection(list, categoryName) {
    const moviesCont = document.getElementById('movies-cont');
    const moviesListHTML = list.map(item => `
        <div class="movie-item">
            <img class="movie-item-img" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bdYbHxECXsN169pVrTz2TobFqXb.jpg" alt="" />
        </div>
    `).join('');

    const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categoryName}</h2>
        <div class="movies-row">${moviesListHTML}</div>
    `;

    const div = document.createElement('div');
    div.className = "movies-section";
    div.innerHTML = moviesSectionHTML;
    moviesCont.append(div);
}

window.addEventListener('load', function() {
    init();
    window.addEventListener('scroll', function(){
        const header = document.getElementById('header');
        if (window.scrollY > 5) header.classList.add('black-bg');
        else header.classList.remove('black-bg');
    });
});

