const baseURL = 'http://localhost:3000/ramens';

const handleClick = (ramen) => {
  const detailImage = document.querySelector('#ramen-detail img');
  const detailName = document.querySelector('#ramen-detail h2');
  const detailRestaurant = document.querySelector('#ramen-detail h3');
  const detailRating = document.querySelector('#rating-display');
  const detailComment = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const newRamen = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: form['new-comment'].value
      };

      appendRamenToMenu(newRamen);

      form.reset();
    });
  } else {
    console.error('Form element with ID "new-ramen" not found in the DOM.');
  }
};

const displayRamens = () => {
  fetch(baseURL)
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = '';

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};

const appendRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

const main = () => {
  displayRamens();

  addSubmitListener();
};

main();

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
