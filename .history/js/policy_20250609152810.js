if (window.location.pathname.includes('detail-product.html')) {
  const id = new URLSearchParams(window.location.search).get("id");

  fetch('../data/products.json')
    .then(res => res.json())
    .then(data => {
      const product = data.find(item => item.id === id);
      if (product) {
        document.querySelector('.product-img').src = product.image;
        document.querySelector('.product-name').textContent = product.name;
        document.querySelector('.product-price').textContent = product.price;
        document.querySelector('.product-description').textContent = product.description;
      } else {
        document.body.innerHTML = '<p>Sản phẩm không tồn tại.</p>';
      }
    })
    .catch(err => {
      console.error('LỖI FETCH:', err);
    });
}