const itemsPerPage = 5;
let currentPage = 1;
let products = []

const search = async () => {
    const response = await fetch('js/test.json');
    products = await response.json();

    showCurrentPage(currentPage)
    paginationControls()

}

const showCurrentPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = products.slice(startIndex, endIndex);


    const productList = document.getElementById('product-list');
    productList.innerHTML="";

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
                ${product.rating?'<p class="second">'+product.rating+'</p>':""}
            </div>
        </div>
        <a class="button" target="_blank" href="${product.articleLink}">Ir</a>
      `;

        productList.appendChild(productItem);
    });
}

const paginationControls = () => {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = '';

    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add("btn_page","button");
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            showCurrentPage(currentPage);
        });

        pagination.appendChild(button);
    }
}