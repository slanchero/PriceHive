const { chromium } = require("playwright");

const exito = async (product, err) => {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(`https://www.exito.com/s?q=${product}`);

        await page.waitForSelector('article[data-testid="store-product-card"]');

        await page.waitForTimeout(5000);

        var productDetails = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('[data-testid="store-product-card"]')); // Selector que engloba cada producto

            return items.slice(0, 5).map(item => {
                const name = item.querySelector('h3[data-fs-product-card-title="true"] a')?.innerText.trim(); // Obtiene el nombre del producto
                const price = item.querySelector('p[data-fs-container-price-otros="true"]')?.innerText.trim().substring(2); // Obtiene el precio
                const rating = item.querySelector('span[data-fs-reviews-reviews-ratings-calification="true"]')?.innerText.trim(); // Asegúrate de que el elemento existe antes de intentar obtener el atributo
                const imageLink = item.querySelector('a[data-fs-link="true"] img')?.src;
                const articleLink = item.querySelector('h3[data-fs-product-card-title="true"] a')?.href;
                return { name, price, rating, imageLink, articleLink, page: "Exito" }; // Retorna un objeto con toda la información
            });
        });

        productDetails.map((product) => {
            product.price = parseInt(product.price.replaceAll(".", ""));
            product.rating = parseFloat(product.rating);
        });

        productDetails.sort((a, b) => a.price - b.price);

        await browser.close();

        return productDetails.slice(0, 3);
    }
    catch (e) {
        if (err < 3) {
            return exito(product, err + 1);
        } else {
            return [];
        }
    }
}

module.exports = { exito };