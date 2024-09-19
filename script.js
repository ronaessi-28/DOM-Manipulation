let products = [];

document.getElementById('add-product').addEventListener('click', addProduct);
document.getElementById('sort-price').addEventListener('click', () => sortProducts('price'));
document.getElementById('sort-rating').addEventListener('click', () => sortProducts('rating'));

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const rating = parseFloat(document.getElementById('product-rating').value);

    if (name && !isNaN(price) && !isNaN(rating)) {
        products.push({ name, price, rating });
        updateGraphs();
        clearInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

function clearInputs() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-rating').value = '';
}

function updateGraphs() {
    drawGraph('price-graph', products.map(product => product.price), 'Price');
    drawGraph('rating-graph', products.map(product => product.rating), 'Rating', true);
}

function drawGraph(graphId, data, label, isRating = false) {
    const graph = document.getElementById(graphId);
    graph.innerHTML = ''; // Clear previous graph

    const max = Math.max(...data);
    data.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar' + (isRating ? ' bar-rating' : '');
        bar.style.height = `${(value / max) * 100}%`;
        bar.textContent = value;
        graph.appendChild(bar);
    });
}

function sortProducts(criteria) {
    products.sort((a, b) => a[criteria] - b[criteria]);
    updateGraphs();
}
