
export function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}


export function createCart() {
    const cart = localStorage.getItem('cart');
    // console.log('cart local storage',cart);
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]))
    } 
}


export function clearCart() {
    const confirmedClear = window.confirm('Do you want to clear your cart?')
    
    if (confirmedClear) {
        localStorage.setItem('cart', JSON.stringify([]))
        console.log('cart is cleared');
        resetCartsHtml();
    } 
}

export function resetCartsHtml() {
    let moviesInCart = document.getElementById('cartContainer');
        moviesInCart.innerHTML = '';
    let clearPrice = document.getElementById('totalPriceCheckout');
        clearPrice.textContent = 'Total Price: ' + 0;
}


export function addToCart(movie) {
    const cart = getCart();

    const movieIndex = cart.findIndex(currentMovie => {
        console.log('current movie',currentMovie);
        if (movie.id === currentMovie.id) {
            return true;
        }
        return false;
    })

    if (movieIndex === -1) {
        cart.push({...movie, quantity: 1});
    } else {
        cart[movieIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}



function removeFromCartByMovieId(movieId) {
    console.log("Removing movie with ID:", movieId);
    const cart = getCart();
    
    const movieIndex = cart.findIndex((movie) => movie.id === movieId);
    
    if (movieIndex >= 0 && movieIndex < cart.length) {
        cart.splice(movieIndex, 1); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
    } 
    
}

export function removeMovieFromCart(event) {
    const cart1 = JSON.parse(localStorage.getItem('cart'));
    let buttonClicked = event.target;
    let movieId = buttonClicked.parentElement.parentElement.getAttribute('movie-id');
    
    removeFromCartByMovieId(movieId);
    console.log("Remove button clicked", movieId);
    buttonClicked.parentElement.parentElement.remove();

    
    updateTotalCartPrice(cart1);
}



export function updateTotalCartPrice(cart) {
    getCart()
    let totalPrice = 0;

    function reducePrice(cartTotal, movie) {
        let moviePrice = movie.price - movie.discountedPrice;
            if (moviePrice > 0) {
                return cartTotal + movie.discountedPrice
            } else {
                return cartTotal + movie.price;
            }
            
    }
    let updatedCartTotal = cart.reduce(reducePrice, totalPrice);
        let updateCart = document.getElementById('totalPriceCheckout');
        updateCart.textContent = "Total price: " + Math.round(updatedCartTotal *100)/100
}

