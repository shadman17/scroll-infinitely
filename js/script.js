const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Unspash API
const count = 10;
const apiKey = 'Yc50KAoFhGcjZghKQTEVzgYr16eZg90Qbu0Ow2B-hC8';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=food-drink`

//function after intial loading
function updateAPIURLWithNewCount(picCount){
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&query=food-drink`

}

//Check whether all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function
function setAttributes(item, attribute){
    for(const key in  attribute){
        item.setAttribute(key, attribute[key])
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach( photo => {
        // Create <a> to link to Unsplash
        const link = document.createElement('a');
        setAttributes(link, {
            href: photo.links.html,
            target: '_blank'
        })
        
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //Event listener whether each photo is loaded
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside imageContainer Element
        link.appendChild(img);
        imageContainer.appendChild(link);
    })
    
}

//Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
        if (initialLoad){
            updateAPIURLWithNewCount(30);
            initialLoad = false;
        }
    } catch(e) {
        
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', scrollFunction)

function scrollFunction(){
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log("load more");
    }
}

//On Load
getPhotos()