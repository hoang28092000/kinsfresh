if (window.location.pathname.includes('detail-policy.html')) {
  const id = new URLSearchParams(window.location.search).get("id");

  fetch('../data/policy.json')
    .then(res => res.json())
    .then(data => {
      const policy = data.find(item => item.id === id);
      if (policy) {
        document.querySelector('.policy-name').textContent = policy.title;
        document.querySelector('.policy-description').textContent = policy.desc;
      } else {
        document.body.innerHTML = '<p>chính sách</p>';
      }
    })
    .catch(err => {
      console.error('LỖI FETCH:', err);
    });
}