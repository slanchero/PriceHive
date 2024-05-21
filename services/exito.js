const { chromium } = require("playwright");

const exito=async (product) => {

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://www.exito.com/s?q=${product}`);

    await page.waitForSelector('article[data-testid="store-product-card"]',{timeout:6000});

    await page.waitForTimeout(5000);

    const productDetails = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[data-testid="store-product-card"]')); // Selector que engloba cada producto
        return items.slice(0, 5).map(item => {
            const name = item.querySelector('h3[data-fs-product-card-title="true"] a')?.innerText.trim(); // Obtiene el nombre del producto
            const price = item.querySelector('p[data-fs-container-price-otros="true"]')?.innerText.trim(); // Obtiene el precio
            const rating = item.querySelector('span[data-fs-reviews-reviews-ratings-calification="true"]')?.innerText.trim(); // Asegúrate de que el elemento existe antes de intentar obtener el atributo
            const imageLink = item.querySelector('a[data-fs-link="true"] img')?.src;
            const articleLink = item.querySelector('h3[data-fs-product-card-title="true"] a')?.href;
            return { name, price, rating, imageLink, articleLink, page: "Exito" }; // Retorna un objeto con toda la información
        });
    });



    await browser.close();

    return productDetails;
}

module.exports = { exito };