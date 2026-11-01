// js/app.js
const API_URL = '/api/products';

async function loadProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    const grid = document.getElementById('products-grid');
    grid.innerHTML = ''; 

    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%;">Nessun prodotto nel catalogo. Aggiungine uno!</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">€ ${product.price.toFixed(2)}</p>
        `;
        grid.appendChild(card);
    });
}

async function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    if (!name || isNaN(price)) {
        alert("Inserisci nome e prezzo validi!");
        return;
    }

    const newProduct = { name: name, price: price };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    });

    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    loadProducts();
}

// Questo è l'equivalente di $(document).ready() in jQuery
// Assicura che l'HTML sia caricato prima di eseguire lo script
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});