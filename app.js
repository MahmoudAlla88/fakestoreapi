// function Product(title, price, description, image) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.image = image;
// }

// Product.prototype.render = function() {
//     const container = document.getElementById('product-container');

//     const card = document.createElement('div');
//     card.className = 'product-card';

//     const img = document.createElement('img');
//     img.src = this.image;
//     img.alt = this.title;

//     const title = document.createElement('h2');
//     title.textContent = this.title;

//     const price = document.createElement('p');
//     price.textContent = `Price: $${this.price}`;

//     const description = document.createElement('p');
//     description.textContent = this.description;

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(price);
//     card.appendChild(description);

//     container.appendChild(card);
// };


// const products = [
//     new Product('Smartphone', 699, 'A high-quality smartphone with amazing features.', 'https://via.placeholder.com/150'),
//     new Product('Laptop', 999, 'A powerful laptop for all your needs.', 'https://via.placeholder.com/150'),
//     new Product('Headphones', 199, 'Noise-cancelling headphones for immersive sound.', 'https://via.placeholder.com/150'),
//     new Product('Smartwatch', 299, 'Stay connected and track your fitness.', 'https://via.placeholder.com/150'),
//     new Product('Camera', 499, 'Capture stunning photos with ease.', 'https://via.placeholder.com/150')
// ];

// products.forEach(product => product.render());









/////////////////////









// Constructor for Product
function Product(id, title, price, description, image) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
}

// Method to render a product as a card
Product.prototype.render = function() {
    const container = document.getElementById('product-container');

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = this.id;

    const img = document.createElement('img');
    img.src = this.image;
    img.alt = this.title;

    const title = document.createElement('h2');
    title.textContent = this.title;

    const price = document.createElement('p');
    price.textContent = `Price: $${this.price}`;

    const description = document.createElement('p');
    description.textContent = this.description;

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Title';
    updateButton.addEventListener('click', () => updateProductTitle(this.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Product';
    deleteButton.addEventListener('click', () => deleteProduct(this.id));

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(updateButton);
    card.appendChild(deleteButton);

    container.appendChild(card);
};

// Fetch and render products
function fetchProducts(newProduct) {
    fetch('https://6784b1391ec630ca33a53263.mockapi.io/products',{
        method:"post",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct), 

    })
        .then(response => response.json())
        .then(data => {
            const products = data.slice(0, 20).map(item => new Product(item.id, item.title, item.price, item.description, item.image));
            products.forEach(product => product.render());
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Update product title
function updateProductTitle(id) {
    const newTitle = prompt('Enter the new title:');
    if (newTitle) {
        const productCard = document.querySelector(`.product-card[data-id='${id}']`);
        if (productCard) {
            const titleElement = productCard.querySelector('h2');
            titleElement.textContent = newTitle;
        }
    }
}

// Delete product
function deleteProduct(id) {
    const productCard = document.querySelector(`.product-card[data-id='${id}']`);
    if (productCard) {
        productCard.remove();
    }
}

// Create a new product
function createProduct() {
    const title = prompt('Enter product title:');
    const price = parseFloat(prompt('Enter product price:'));
    const description = prompt('Enter product description:');
    const image = prompt('Enter product image URL:') || 'https://via.placeholder.com/150';

    if (title && !isNaN(price) && description) {
        const newProduct = new Product(Date.now(), title, price, description, image);
        newProduct.render();
        fetchProducts(newProduct);
    }
}

// Example usage


// Adding a button to create new products
document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.createElement('button');
    createButton.textContent = 'Create New Product';
    createButton.addEventListener('click', createProduct);

    document.body.insertBefore(createButton, document.querySelector('main'));
});
