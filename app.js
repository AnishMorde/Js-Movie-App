const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById('search');
getMovies(APIURL);

async function getMovies(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    console.log(responseData);

    showMovies(responseData.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img 
                src="${IMGPATH + movie.poster_path}" 
                alt="${movie.title}"
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span>${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview</h4>
                ${movie.overview}
            </div>
        `;

        movieEl.addEventListener('click', () => {
            showTrailer(movie.id);
        });

        main.appendChild(movieEl);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchData = search.value;
    if (searchData) {
        getMovies(SEARCHAPI + searchData);
        search.value = '';
    }
});

async function showTrailer(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`);
    const data = await response.json();
    console.log(data);

    if (data.results.length > 0) {
        const videoKey = data.results[0].key;
        const youtubeURL = `https://www.youtube.com/watch?v=${videoKey}`;
        window.open(youtubeURL, '_blank');
    } else {
        alert('Trailer not available');
    }
}
