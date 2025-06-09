if (window.location.pathname.includes('detail-po.html')) {
  const id = new URLSearchParams(window.location.search).get("id");

  fetch('../data/detail-policy.json')
    .then(res => res.json())
    .then(data => {
      const po = data.find(item => item.id === id);
      if (po) {
        document.querySelector('.po-img').src = po.image;
        document.querySelector('.po-name').textContent = po.name;
        document.querySelector('.po-price').textContent = po.price;
        document.querySelector('.po-description').textContent = po.description;
      } else {
        document.body.innerHTML = '<p>Sản phẩm không tồn tại.</p>';
      }
    })
    .catch(err => {
      console.error('LỖI FETCH:', err);
    });
}