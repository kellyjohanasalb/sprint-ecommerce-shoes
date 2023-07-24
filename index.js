const api = 'http://localhost:3000/products';

const getData = async (id) => {
  const apiUrl = id ? `${api}/${id}` : api;
  const response = await fetch(apiUrl);
  const data = response.json();
  return data;
}

const getHash = () => {
  const params = new URLSearchParams(location.search);
  return params.get('id') || '/';
};



const detailSection = async () => {
  const id = Number.parseInt(getHash(), 10);
  const data = await getData(id);
  // Content from api
  const company = document.querySelector('.product-details__company');
  const title = document.querySelector('.product-details__title');
  const description = document.querySelector('.product-details__description');
  const prices =  document.querySelector('.product-details__prices');
  prices.innerHTML = `
    <p class="product-details__current">$${data.price}.00 <span class="product-details__discount">50%</span> </p>
    <span class="product-details__last">$${data.price * 2}.00</span>`
  company.textContent = data.brand;
  title.textContent = data.name;
  description.textContent = data.description;

  // Gallery functionality
  const galleryImage = document.querySelector('.image');
  const previousGalleryButton = document.querySelector('.gallery__previuos');
  const nextGalleryButton = document.querySelector('.gallery__next');
  galleryImage.src = data.images[0];

  // Change images with previous and next buttons
  const imageContainer = document.querySelector('.gallery__image');
  let imgIndicator = 1;

  previousGalleryButton.addEventListener('click', () => {
    changePreviousImage(imageContainer);
  });
  nextGalleryButton.addEventListener('click', () => {
    changeNextImage(imageContainer);
  });

  const changeNextImage = (imgContainer) => {
    if (imgIndicator === 3) {
      imgIndicator = 0;
    } else {
      imgIndicator++;
    }
    imgContainer.innerHTML = `<img src="${data.images[imgIndicator]}" alt="product">`;
  }
  const changePreviousImage = (imgContainer) => {
    if (imgIndicator === 0) {
      imgIndicator = 3;
    } else {
      imgIndicator--;
    }
    imgContainer.innerHTML = `<img src="${data.images[imgIndicator]}" alt="product">`;
  }

  const thumb1 = document.querySelector('#thumbnail-1');
  const thumb2 = document.querySelector('#thumbnail-2');
  const thumb3 = document.querySelector('#thumbnail-3');
  const thumb4 = document.querySelector('#thumbnail-4');

  thumb1.src = data.thumbnails[0]
  thumb2.src = data.thumbnails[1]
  thumb3.src = data.thumbnails[2]
  thumb4.src = data.thumbnails[3]

  let thumbnails = document.querySelectorAll('.gallery__thumbnail');
  thumbnails = [...thumbnails] // transform from NodeList to Array
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', e => {
      const stringId = e.target.id;
      imageContainer.innerHTML = `<img src="${data.thumbnails[stringId.slice(-1) - 1]}" alt="product">`;
    })
  });

  const modalImageGallery = document.querySelector('.modal-image');
  modalImageGallery.src = data.images[0];
  const thumbModal1 = document.querySelector('#modal-thumbnail-1');
  const thumbModal2 = document.querySelector('#modal-thumbnail-2');
  const thumbModal3 = document.querySelector('#modal-thumbnail-3');
  const thumbModal4 = document.querySelector('#modal-thumbnail-4');

  thumbModal1.src = data.thumbnails[0]
  thumbModal2.src = data.thumbnails[1]
  thumbModal3.src = data.thumbnails[2]
  thumbModal4.src = data.thumbnails[3]
  
  const imageModalContainer = document.querySelector('.modal-gallery__image');
  let modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail');
  modalThumbnails = [...modalThumbnails];
  modalThumbnails.forEach(modalThumbnail => {
    modalThumbnail.addEventListener('click', e => {
      const stringId = e.target.id;
      imageModalContainer.innerHTML = `<img src="${data.thumbnails[stringId.slice(-1) - 1]}" alt="product">`;

    });
  });

  const previousModalGalleryButton = document.querySelector('.modal-gallery__previuos');
  const nextModalGalleryButton = document.querySelector('.modal-gallery__next');
  previousModalGalleryButton.addEventListener('click', () => {
    changePreviousImage(imageModalContainer);
  });
  nextModalGalleryButton.addEventListener('click', () => {
    changeNextImage(imageModalContainer);
  });

  // Show Modal Gallery (by clicking principal image)
  const modalGallery = document.querySelector('.modal-gallery__background');
  const closeModalGalleryButton = document.querySelector('.modal-gallery__close');

  imageContainer.addEventListener('click', () => {
    if (window.innerWidth >= 1115) {
      modalGallery.style.display = 'grid';
    }
  });

  closeModalGalleryButton.addEventListener('click', () => {
    modalGallery.style.display = 'none';
  });

  // Draw product into modal cart
  const drawProductModal = () => {
    orderContainer.innerHTML = `
          <div class="cart-modal__detail-container">
            <img class="thumbnail-image" src="${data.images[0]}" alt="thumbnail" style="width: 65px; height: 65px;">
            <div>
              <p class="cart-modal__product">${data.name}..</p>
              <p class="cart-modal__price">$${data.price}.00 x${lastValue} <span>$${lastValue * data.price}.00</span></p>
            </div>
            <img class="cart-modal__delete" src="./assets/images/icon-delete.svg" alt="delete">
          </div>
          <button class="cart-modal__checkout">Checkout</button>
        `;
    deleteProduct();
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$${data.price} x${lastValue} <span>$${lastValue * data.price}.00</span>`;
  
    // Show modal checkout
    const modalCheckoutButton = document.querySelector('.cart-modal__checkout');
    const modalCheckout = document.querySelector('.modal-checkout__background');
    const closeModal = document.querySelector('.modal-checkout__close-icon');

    modalCheckoutButton.addEventListener('click', () => {
      modalCheckout.style.display = 'grid';
    });
    closeModal.addEventListener('click', () => {
      modalCheckout.style.display = 'none';
    });
  };
  
  // Delete Products Shopping Cart
  const deleteProduct = () => {
    const deleteProductCart = document.querySelector('.cart-modal__delete');
    deleteProductCart.addEventListener('click', () => {
    orderContainer.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
    lastValue = 0;
    cartNotification.textContent = lastValue;
    });
  }
  

  // Add products to shopping cart
  const addToCartButton = document.querySelector('.product-details__button');
  let cartNotification = document.querySelector('.header__cart--counter');
  let lastValue = Number.parseInt(cartNotification.textContent, 10);

  addToCartButton.addEventListener('click', () => {
    lastValue += quantityProduct;
    cartNotification.textContent = lastValue;
    cartNotification.style.display = 'block';
    drawProductModal();
  });

  // show modal cart shopping
  const cartIcon = document.querySelector('.header__cart');
  const cartModal = document.querySelector('.cart-modal');
  const orderContainer = document.querySelector('.cart-modal__checkout-container');

  cartIcon.addEventListener('click', () => {
    cartModal.classList.toggle('show');
    if (lastValue === 0) {
      orderContainer.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
    } else {
      drawProductModal();
    }
  });

  
  
  // Cart counter
  let spanCount = document.querySelector('.quantity__number');
  let addCounterBtn = document.querySelector('.plus-quantity');
  let minusCounterBtn = document.querySelector('.minus-quantity');
  let quantityProduct = 0;

  addCounterBtn.addEventListener('click', () => {
    quantityProduct++;
    spanCount.textContent = quantityProduct;
  });

  minusCounterBtn.addEventListener('click', () => {
    quantityProduct--;
    if (quantityProduct <= 0) {
      spanCount.textContent = 0;
    } else {
      spanCount.textContent = quantityProduct;
    }
  });

  
}


// Open/Close Navbar Modal
const burgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeNavbar = document.querySelector('.modal-navbar__close-icon');

burgerMenu.addEventListener('click', () => {
  modalNavbar.classList.toggle('show');
});
closeNavbar.addEventListener('click', () => {
  modalNavbar.classList.remove('show');
});




detailSection();