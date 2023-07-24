const api = 'http://localhost:3000/products';

const getData = async (id) => {
  const apiUrl = id ? `${api}/${id}` : api;
  const response = await fetch(apiUrl);
  const data = response.json();
  return data;
}

const detailSection = async () => {
  const data = await getData(9);
  console.log(data);
  const gallery = document.querySelector('.gallery');
  const galleryImageContainer = document.querySelector('.gallery__image');
  const galleryImage = document.querySelector('.image');
  const previousGalleryButton = document.querySelector('.gallery__previuos');
  const nextGalleryButton = document.querySelector('.gallery__next');
  galleryImage.src = data.images[0];
  previousGalleryButton.addEventListener('click', () => {
    changePreviousImage(imageContainer);
  });
  nextGalleryButton.addEventListener('click', () => {
    changeNextImage(imageContainer);
  });
}

// const changeNextImage = (imgContainer) => {
//   if (imgIndicator === 4) {
//     imgIndicator = 1;
//   } else {
//     imgIndicator++;
//   }
//   // imgContainer.style.backgroundImage = `url('../assets/images/image-product-${imgIndicator}.jpg')`;
//   imgContainer.innerHTML = `<img src="./assets/images/image-product-${imgIndicator}.jpg" alt="product">`;

// }

// const changePreviousImage = (imgContainer) => {
//   if (imgIndicator === 1) {
//     imgIndicator = 4;
//   } else {
//     imgIndicator--;
//   }
//   imgContainer.innerHTML = `<img src="./assets/images/image-product-${imgIndicator}.jpg" alt="product">`;
// }

detailSection()