
import { createCart, addToCart } from "./cart.mjs";

let movie = JSON.parse(localStorage.getItem('movie'));


const chosenMovie = () => {
    let movieImageUrl = movie.image.url;
    
    let movieImageElement = document.createElement('img');
        movieImageElement.classList.add('imgTest');
        movieImageElement.src = movieImageUrl;
    
    document.getElementById('movieImgContainer').appendChild(movieImageElement);
}



const chosenMovieTitle = () => {
    let movieTitle = movie.title;
    
    let title = document.createElement('h2');
        title.classList.add('movieTitle');
        title.textContent = movieTitle;
        
        document.getElementById('movieTitleContainer').appendChild(title);
}

const chosenMovieDescription = () => {
    let movieDescription = movie.description;
    
    let description = document.createElement('h3');
        description.classList.add('movieDescription');
        description.textContent = movieDescription;
        
        document.getElementById('allMovieInfo').appendChild(description);
}

const chosenMovieGenre = () => {
    let movieGenre = movie.genre;
    
    let genre = document.createElement('h3');
        genre.classList.add('movieGenre');
        genre.textContent = 'Genre: ' + movieGenre;
        
        document.getElementById('allMovieInfo').appendChild(genre);
}


let moviePrice = movie.price;
let movieDiscountedPrice = movie.discountedPrice;
let movieOnSale = movie.onSale;

const chosenMoviePrice = () => {
    
    let price = document.createElement('div');
        price.classList.add('moviePrice');
    
    let originalPrice = document.createElement('h3');
        originalPrice.textContent = 'Price: ' + moviePrice + ' Kr';
        if (movieOnSale) {
            originalPrice.style.textDecoration = 'line-through';
        }
        price.appendChild(originalPrice);
        
        if (movieOnSale) {
            let salePrice = movieDiscountedPrice;
            let salePriceElement = document.createElement('h3');
            salePriceElement.textContent = 'On Sale: ' + salePrice + ' Kr';
            salePriceElement.style.color = 'green';
            price.appendChild(salePriceElement);
        }

        document.getElementById('allMovieInfo').appendChild(price);
}



const chosenMovieReleased = () => {
    let movieReleased = movie.released;
    
    let released = document.createElement('h3');
        released.classList.add('movieReleased');
        released.textContent = 'Released: ' + movieReleased;
        
        document.getElementById('allMovieInfo').appendChild(released);
}

const chosenMovieRating = () => {
    let movieRatings = movie.rating;
    
    let rating = document.createElement('h3');
        rating.classList.add('movieRatings');
        rating.textContent = 'Rating: ' + movieRatings;
        
        document.getElementById('allMovieInfo').appendChild(rating);
}

const button = () => {
    let createButton = document.createElement('button');
        createButton.classList.add('btn');
        createButton.price = movie.price;
        createButton.textContent = createButton.price + ' Kr';
        createButton.addEventListener('click', () => {
            console.log('clicked');
            addToCart(movie);
        })
        document.getElementById('btnContainer').appendChild(createButton);
}

const favBtn = () => {
    let createFavBtn = document.createElement('div');
        createFavBtn.classList.add('fa-regular', 'fa-heart')
        if (movie.favorite) {
            createFavBtn.classList.remove('fa-regular');
            createFavBtn.classList.add('fa-solid', 'fa-heart');
            createFavBtn.style.color = 'red';
        } else {
            createFavBtn.classList.remove('fa-solid', 'fa-heart');
            createFavBtn.classList.add('fa-regular', 'fa-heart');
        }
        document.getElementById('btnContainer').appendChild(createFavBtn);
}       




chosenMovie();
chosenMovieTitle();
chosenMovieDescription();
chosenMovieGenre();
chosenMoviePrice();
chosenMovieReleased();
chosenMovieRating();
button();
favBtn();
createCart();
