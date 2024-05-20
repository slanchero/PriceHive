const { chromium } = require("playwright");

const olimpica = async (product) => {

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://www.olimpica.com/${product}`);

    await page.waitForSelector('.vtex-product-price-1-x-sellingPrice--hasListPrice--dynamicF', { timeout: 5000 });

    const productDetails = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.vtex-search-result-3-x-galleryItem')); // Selector que engloba cada producto
        return items.slice(0, 5).map(item => {
            window.scrollBy(0, window.innerHeight)
            const name = item.querySelector('.vtex-product-summary-2-x-productBrand')?.innerText.trim(); // Obtiene el nombre del producto
            const price = item.querySelector('.vtex-product-price-1-x-sellingPrice--hasListPrice--dynamicF')?.innerText.trim().substring(2).replaceAll(".", ""); // Obtiene el precio
            const imageLink = item.querySelector('.vtex-product-summary-2-x-imageNormal')?.src;
            const articleLink = item.querySelector('.vtex-product-summary-2-x-clearLink')?.href;
            window.scrollBy(window.innerHeight, 0)
            return { name, price, rating: undefined, imageLink, articleLink, page: "Olimpica" }; // Retorna un objeto con toda la información
        });
    });

    await browser.close();

    productDetails.map((product) => {
        product.price = parseInt(product.price);
    });

    productDetails.sort((a, b) => a.price - b.price);

    return productDetails;
};

module.exports = { olimpica };