
import { API_MOVIE_URL, fetchMovieAPI } from "./fetch.mjs";
import { addGenreEventListener } from "./sortByGenre.mjs";
import { createCart, addToCart } from "./cart.mjs";



function createMovieHtml(movie) {
    let movieContainer = document.createElement('div');
        movieContainer.classList.add('movieContainer');  
        
    let movieImgContainer = document.createElement('div');
        movieImgContainer.classList.add('movieImgContainer');

    let movieImg = document.createElement('img');
        movieImg.classList.add('movie');
        movieImg.src = movie.image.url;
        movieImg.alt = movie.image.alt;
        movieImg.id = movie.id;
        movieImg.addEventListener('click', () => {
            localStorage.setItem('movie', JSON.stringify(movie));
        })

    let linkToMovieInfoPage = document.createElement('a');
        linkToMovieInfoPage.href = 'html/movieinfo.html';
        linkToMovieInfoPage.classList.add('movie');

    let priceAndAddContainer = document.createElement('div');
        priceAndAddContainer.classList.add('priceCartItems');
    
    let moviePrice = document.createElement('p');
        if (movie.onSale) {
            moviePrice.textContent = movie.discountedPrice + ' Kr';
            moviePrice.style.color = 'green';
        }
        if (!movie.onSale) {
            moviePrice.textContent = movie.price + ' Kr'; 
        }
        
    
    let addToCartButton = document.createElement('button');
        addToCartButton.classList.add('fa-solid', 'fa-cart-shopping');
        addToCartButton.addEventListener('click', () => {
            createCart();
            addToCart(movie);
        })

    let favoriteButton = document.createElement('button');
        favoriteButton.classList.add('fa-regular', 'fa-heart')
        if (movie.favorite) {
            favoriteButton.classList.remove('fa-regular');
            favoriteButton.classList.add('fa-solid', 'fa-heart');
            favoriteButton.style.color = 'red';
        } else {
            favoriteButton.classList.remove('fa-solid', 'fa-heart');
            favoriteButton.classList.add('fa-regular', 'fa-heart');
        }
    
        movieImgContainer.append(linkToMovieInfoPage, priceAndAddContainer);
        linkToMovieInfoPage.appendChild(movieImg);
        priceAndAddContainer.append(moviePrice, favoriteButton, addToCartButton);
        movieContainer.appendChild(movieImgContainer);

    return movieContainer;
}



export function displayMovies(movies) {
    let displayMovieWrapper = document.getElementById('movieWrapper');
        displayMovieWrapper.innerHTML = '';
    movies.forEach((movieList) => {
        let movieHtml = createMovieHtml(movieList);
        displayMovieWrapper.appendChild(movieHtml);
    })
    
}

async function main() {
    let movieData = await fetchMovieAPI(API_MOVIE_URL);
    let movies = movieData.data;
    
    displayMovies(movies);
    addGenreEventListener(movies);
    createCart();
}
main();








