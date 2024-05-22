const { chromium } = require("playwright");

const alkosto = async (product) => {

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://www.alkosto.com/search/?text=${product}`);

    await page.waitForSelector('.product__item__top__title');

    const productDetails = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.product__item')); // Selector que engloba cada producto
        return items.slice(0, 5).map(item => {
            const name = item.querySelector('.product__item__top__title')?.innerText.trim(); // Obtiene el nombre del producto
            const price = item.querySelector('.price')?.innerText.trim().substring(1); // Obtiene el precio
            const rating = item.querySelector('.hit-stars span')?.classList[0].substring(8); // Obtiene la cantidad disponible
            const imageLink = item.querySelector('.product__item__information__image img')?.src;
            const articleLink = item.querySelector('.js-view-details')?.href;
            return { name, price, rating, imageLink, articleLink, page: "Alkosto" }; // Retorna un objeto con toda la información
        }
        );
    });

    await browser.close();

    productDetails.map((product) => {
        product.price = parseInt(product.price.replaceAll(".", ""));
        product.rating = parseFloat(product.rating)/10;
    });

    productDetails.sort((a, b) => a.price - b.price);

    return productDetails.slice(0, 3);
}

module.exports = { alkosto };