const api = 'http://localhost:3000/products';

const getData = async (id) => {
  const apiUrl = id ? `${api}/${id}` : api;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

const homeSection = async () => {
  const products = await getData();
  const homeContainer = document.querySelector('.home-container');
  homeContainer.innerHTML = '';

  const shopContainer = document.createElement('div');
  shopContainer.className = 'shop__container grid';

  products.forEach(product => {
    const shopItems = document.createElement('div');
    shopItems.className = 'shop__items grid';

    const link = document.createElement('a');
    link.href = `#/${product.id}`;
    link.className = 'shop__link button-details';

    const shopContent = document.createElement('div');
    shopContent.className = 'shop__content';

    const img = document.createElement('img');
    img.src = product.images[0];
    img.alt = product.name;
    img.className = 'shop__img';

    const shopPrices = document.createElement('div');
    shopPrices.className = 'shop__prices';

    const title = document.createElement('h3');
    title.className = 'shop__title';
    title.textContent = product.name;

    const price = document.createElement('span');
    price.className = 'shop__price';
    price.textContent = `$${product.price}.00`;

    shopPrices.appendChild(title);
    shopPrices.appendChild(price);

    shopContent.appendChild(img);
    shopContent.appendChild(shopPrices);

    link.appendChild(shopContent);

    shopItems.appendChild(link);
    shopContainer.appendChild(shopItems);
  });

  homeContainer.appendChild(shopContainer);

  const redirectToProductDetails = (productId) => {
    const url = `index.html?id=${productId}`;
    window.location.href = url;
  };

  homeContainer.addEventListener('click', (event) => {
    const target = event.target.closest('.button-details');
    if (target) {
      event.preventDefault();
      const href = target.getAttribute('href');
      const productId = href ? href.split('/')[1] : null;
      if (productId) {
        redirectToProductDetails(productId);
      }
    }
  });
};

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

// show modal cart shopping
const cartIcon = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price');
const orderContainer = document.querySelector('.cart-modal__checkout-container');

cartIcon.addEventListener('click', () => {
  cartModal.classList.toggle('show');
    orderContainer.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
});

homeSection();
