const { chromium } = require("playwright");

const mercadoLibre = async (product) => {
    try {

        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(`https://listado.mercadolibre.com.co/${product}`);

        await page.waitForSelector('.ui-search-layout__item');

        var productDetails = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.ui-search-layout__item')); // Selector que engloba cada producto
            return items.slice(0, 5).map(item => {
                const name = item.querySelector('.ui-search-item__title')?.innerText.trim(); // Obtiene el nombre del producto
                const price = parseInt(item.querySelector('.andes-money-amount__fraction')?.innerText.trim().replaceAll(".", "")); // Obtiene el precio
                const rating = item.querySelector('.ui-search-reviews__rating-number')?.innerText.trim(); // Obtiene la cantidad disponible
                const imageLink = item.querySelector('.ui-search-result-image__element')?.src;
                const articleLink = item.querySelector('.ui-search-link__title-card')?.href;
                return { name, price, rating, imageLink, articleLink, page: "Mercado Libre" }; // Retorna un objeto con toda la información
            });
        });
        await browser.close();

        productDetails = productDetails.filter(product => !product.name.toLowerCase().includes('reacondicionado'));


        productDetails.map((product) => { product.rating = parseFloat(product.rating); });

        productDetails.sort((a, b) => a.price - b.price);

        return productDetails.slice(0, 3);
    }
    catch (e) {
        if (err < 3) {
            return mercadoLibre(product, err + 1);
        } else {
            return [];
        }
    }
};

module.exports = { mercadoLibre };