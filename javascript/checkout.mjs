import { removeMovieFromCart, clearCart, resetCartsHtml, getCart, updateTotalCartPrice} from "./cart.mjs";


let clearCartButton = document.getElementById('clearCart');
    clearCartButton.addEventListener('click', () => {
        clearCart();
    })

function createHtmlForMovie(movie) {
    let cartListMovies = document.createElement('div');
        cartListMovies.classList.add('cart-list');
        cartListMovies.setAttribute('movie-id', movie.id)

    let infoContainer = document.createElement('div');
        infoContainer.classList.add('infoStyleContainer');

    let movieImgInCart = document.createElement('img');
        movieImgInCart.src = movie.image.url;
        movieImgInCart.classList.add('img-in-cart');

    let linkToMovieInfoPage = document.createElement('a');
    linkToMovieInfoPage.classList.add('movie', 'imgStyleContainer');
    linkToMovieInfoPage.href = '/SquareEyes-JS/html/movieinfo.html';
    linkToMovieInfoPage.addEventListener('click', () => {
        localStorage.setItem('movie', JSON.stringify(movie));
    })
        

    let movieInCart = document.createElement('div');
        movieInCart.classList.add('movie-in-cart');

    let movieTitle = document.createElement('div');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('cartTitle');

    let movieQuantity = document.createElement('div');
        movieQuantity.textContent = `Quantity: ${movie.quantity}`;
        movieQuantity.classList.add('cartInfo');

    let moviePrice = document.createElement('div');
        moviePrice.textContent = `Price: ${movie.price}`;
        moviePrice.classList.add('cartInfo');
        if (movie.onSale) {
            moviePrice.style.textDecoration = 'line-through';
        }

    let movieSalePrice = document.createElement('div');
        movieSalePrice.textContent = `On Sale: ${movie.discountedPrice}`;
        movieSalePrice.classList.add('cartInfo');
        movieSalePrice.style.color = 'green';
        if (!movie.onSale) {
            movieSalePrice.textContent = '';
        } 
        
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', (event) => {
            removeMovieFromCart(event);
            updateTotalCartPrice(getCart())
        });
        
        cartListMovies.append(linkToMovieInfoPage, infoContainer);
        linkToMovieInfoPage.appendChild(movieImgInCart);
        infoContainer.append(
            movieInCart, 
            movieTitle, 
            moviePrice, 
            movieSalePrice, 
            movieQuantity, 
            removeButton);
        return cartListMovies;
}



let totalPrice = 0;
export function displayTotalPrice(movie) {
    movie??[]
    movie.forEach(movie => {
        totalPrice += movie.price && movie.discountedPrice * movie.quantity;
    });
    
    let formattedTotalPrice = formatCurrency(totalPrice);
    let displayTotalPrice = document.getElementById ('totalPriceCheckout');
    displayTotalPrice.textContent = `Total Price: ${formattedTotalPrice}`;
    
}




function formatCurrency(total) {
    return Math.round(total * 100) / 100;
}



function purchaseButtonHtml() {
    let buyButton = document.getElementById('buyButton');
        buyButton.classList.add('btn');
        buyButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (getCart().length === 0) {
                alert('Your cart is empty')
            } else {
                resetCartsHtml();
                localStorage.removeItem('cart')
                alert('Thank you for your purchase')
                window.location.href = '../html/checkout-success.html'
            }
        });
}





export function displayCartMovies() {
    let displayCartContainer = document.getElementById('cartContainer');
        displayCartContainer.innerHTML = '';
    let cart = getCart();
    
    purchaseButtonHtml(); 
    displayTotalPrice(cart); 

    cart.forEach((currentMovie) => {
        let movieHtml = createHtmlForMovie(currentMovie);
        displayCartContainer.appendChild(movieHtml);    
    })
}



function mainCart() {
    displayCartMovies();  
}

mainCart();
