// Products carousel functionality
let currentProductIndex = 0;
const productSlides = document.querySelectorAll('.Product-slide');
const productGallery = document.querySelector('.product-gallery');
const productLeftArrow = document.getElementById('productsLeftArrow');
const productRightArrow = document.getElementById('productsRightArrow');

function showProductSlide(index) {
  const translateX = -index * 100;
  productGallery.style.transform = `translateX(${translateX}%)`;
}

productLeftArrow.addEventListener('click', () => {
  currentProductIndex = (currentProductIndex - 1 + productSlides.length) % productSlides.length;
  showProductSlide(currentProductIndex);
  clearInterval(autoFlipProductInterval);
  autoFlipProductInterval = setInterval(() => {
    currentProductIndex = (currentProductIndex + 1) % productSlides.length;
    showProductSlide(currentProductIndex);
  }, 6000);
});

productRightArrow.addEventListener('click', () => {
  currentProductIndex = (currentProductIndex + 1) % productSlides.length;
  showProductSlide(currentProductIndex);
  clearInterval(autoFlipProductInterval);
  autoFlipProductInterval = setInterval(() => {
    currentProductIndex = (currentProductIndex + 1) % productSlides.length;
    showProductSlide(currentProductIndex);
  }, 6000);
});

// Initialize products carousel
showProductSlide(currentProductIndex);

// Auto-slide products every 6 seconds if no interaction
let autoFlipProductInterval = setInterval(() => {
  currentProductIndex = (currentProductIndex + 1) % productSlides.length;
  showProductSlide(currentProductIndex);
}, 6000);


const product3dImages = document.querySelectorAll('.product-3d');

product3dImages.forEach(img => {
  img.addEventListener('mousemove', (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * 10;
    const rotateY = (centerX - x) / centerX * 10;
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  img.addEventListener('mouseleave', () => {
    img.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});
