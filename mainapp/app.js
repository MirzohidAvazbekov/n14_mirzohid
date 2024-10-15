const mensClothingLink = document.getElementById('mens-clothing');
const womensClothingLink = document.getElementById('womens-clothing');
const jewelryLink = document.getElementById('jewelry');
const electronicsLink = document.getElementById('electronics');
const homeAppliancesLink = document.getElementById('home-appliances');
const cardsContainer = document.getElementById('cards-container');

mensClothingLink.addEventListener('click', () => loadCategory('Men\'s Clothing', 'https://fakestoreapi.com/products/category/men\'s clothing'));
womensClothingLink.addEventListener('click', () => loadCategory('Women\'s Clothing', 'https://fakestoreapi.com/products/category/women\'s clothing'));
jewelryLink.addEventListener('click', () => loadCategory('Jewelry', 'https://fakestoreapi.com/products/category/jewelery'));
electronicsLink.addEventListener('click', () => loadCategory('Electronics', 'https://fakestoreapi.com/products/category/electronics'));
homeAppliancesLink.addEventListener('click', () => loadCategory('Home Appliances', 'https://fakestoreapi.com/products/category/electronics')); // FakestoreAPI does not have "Home Appliances", using electronics

function loadCategory(category, apiUrl) {
    cardsContainer.innerHTML = `<h2>${category}</h2>`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.slice(0, 8).forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description.substring(0, 60)}...</p>
                    <p class="price">$${product.price}</p>
                    <p class="rating">Rating: ${product.rating.rate} &#9733;</p>
                    <button>Add to Cart</button>
                `;
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
