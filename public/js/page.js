const itemsPerPage = 5;
var currentPage = 1;
var products = []
var filteredProducts = products;

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('search_input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            search();
        }
    });

    const filterSelect = document.getElementById('filter');
    const sortSelect = document.getElementById('sort-by');

    filterSelect.addEventListener('change', function () {
        const selectedFilter = this.value;
        if (selectedFilter === '') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.page.toLowerCase() === selectedFilter.toLowerCase());
        }

        showCurrentPage(currentPage);
        paginationControls();
    });

    sortSelect.addEventListener('change', function () {
        const selectedSort = this.value;

        if (selectedSort === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);   
        } else if (selectedSort === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }else if (selectedSort === 'rating-asc') {
            filteredProducts.sort((a, b) => (a.rating ?? -Infinity) - (b.rating ?? -Infinity));
        }else if (selectedSort === 'rating-desc') {
            filteredProducts.sort((a, b) => (b.rating ?? -Infinity) - (a.rating ?? -Infinity));
        }else if (selectedSort === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }else if (selectedSort === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        showCurrentPage(currentPage);
        paginationControls();
    });

});

const search = async () => {

    const product = document.getElementById('search_input').value;

    if (!product) {
        alert('Please enter a product');
        return;
    }
    const productList = document.getElementById('product-list');
    productList.innerHTML = `
    <div class="waiting-screen" id="wait">
    </div>
    `;

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = '';

    const waitDiv = document.getElementById('wait');

    waitDiv.innerHTML = `
    <div class="loader">
        <div class="eye"></div>
    </div>
    `;

    const response = await fetch(`http://localhost:3000/products/${product}`);
    products = await response.json();

    filteredProducts = products;

    showCurrentPage(currentPage)
    paginationControls()
}

const showCurrentPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredProducts.slice(startIndex, endIndex);


    const productList = document.getElementById('product-list');
    productList.innerHTML = "";

    itemsToDisplay.forEach(product => {

        const productItem = document.createElement('div');
        productItem.className = 'product-card';

        productItem.innerHTML = `
        <div class="product-img">
            <img src="${product.imageLink}" alt="MacBook Air">
        </div>
        <div class="product-info">
            <div class="info">
                <h3>${product.name}</h3>
                <p class="second">${product.page}</p>
                <p class="second">$${product.price}</p>
                ${product.rating ? '<p class="second">' + product.rating + '</p>' : ""}
            </div>
        </div>
        <a href="${product.articleLink}" target="_blank" class="cta">
            <span class="hover-underline-animation"> Shop now </span>
            <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="10"
                viewBox="0 0 46 16"
            >
                <path
                id="Path_10"
                data-name="Path 10"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
                ></path>
            </svg>
        </a>
      `;

        productList.appendChild(productItem);
    });
}

const paginationControls = () => {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add("btn_page", "button");
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            showCurrentPage(currentPage);
        });

        pagination.appendChild(button);
    }
}