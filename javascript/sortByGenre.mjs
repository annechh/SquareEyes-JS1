import { displayMovies } from "./index.mjs";

export function addGenreEventListener(movies) {
    let listOfGenre = document.getElementById('genreList').children;
    for(let genreListItem of listOfGenre) {
        genreListItem.addEventListener('click', (event) => {
            event.stopPropagation();
            filterMoviesByGenre(movies, genreListItem.textContent);
        });
    }  
    document.body.addEventListener('click', (event) => {
        const genreList = document.getElementById('genreList');
        if(!genreList.contains(event.target)) {
            closeGenreFilter();
        }
    });
}

function filterMoviesByGenre(movies, genre){
let filteredMovies = movies.filter(movie => {
    let checkGenre = movie.genre === genre;
    if (genre === 'Show All')
        return true;
        return checkGenre;
    })
    displayMovies(filteredMovies);
}


function closeGenreFilter() {
    const genreList = document.getElementById('sortByGenre');
    genreList.removeAttribute('open');
}