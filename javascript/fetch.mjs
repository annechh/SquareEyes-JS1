const API_MAIN_URL = "https://v2.api.noroff.dev";

export const API_MOVIE_URL = `${API_MAIN_URL}/square-eyes`;


export async function fetchMovieAPI(url) {
    try {
        showLoader();
        let response = await fetch(url);
        let json = await response.json();
        hideLoader();
        return json;
    } catch (error) {
        console.error('Could not fetch data' + error);
        throw error("There was a problem!");
    } 
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}