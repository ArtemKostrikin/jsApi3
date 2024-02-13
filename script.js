const ACCESS_KEY = 'T-44XAMBm_f0RuRlUvt9n38YhTDX7HGaF-Joq10UskE';
const BASE_URL = 'https://api.unsplash.com/photos/random';
let currentPhotoIndex = 0;
let likedPhotos = [];
let viewedPhotos = [];

const photoEl = document.getElementById('photo');
const photographerEl = document.getElementById('photographer');
const likeBtn = document.getElementById('like-btn');
const likeCount = document.getElementById('like-count');

getRandomPhoto();

likeBtn.addEventListener('click', () => {
    if (!likedPhotos.includes(currentPhotoIndex)) {
        likedPhotos.push(currentPhotoIndex);
        likeCount.textContent = likedPhotos.length;
        saveLikedPhotos();
    }
});

async function getRandomPhoto() {
    try {
        const response = await fetch(`${BASE_URL}?client_id=${ACCESS_KEY}`);
        const photoData = await response.json();
        if (photoData && photoData.urls && photoData.user) {
            photoEl.src = photoData.urls.small;
            photographerEl.textContent = `Photographer: ${photoData.user.name}`;
            saveViewedPhotos(photoData);
        }
    } catch (error) {
        console.log('Error fetching photo:', error);
    }
}

function saveLikedPhotos() {
    localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
}

function saveViewedPhotos(photoData) {
    viewedPhotos.push({
        id: currentPhotoIndex,
        urls: photoData.urls,
        user:{
            name:photoData.user.name
        }
    });
    localStorage.setItem('viewedPhotos',JSON.stringify(viewedPhotos));
}
