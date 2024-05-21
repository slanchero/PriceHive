const { chromium } = require("playwright");

const falabella=async (product) => {

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://www.falabella.com.co/falabella-co/search?Ntt=${product}`);

    await page.waitForSelector(".subTitle-rebrand");

    const productDetails = await page.evaluate(() => {
        let items = Array.from(document.querySelectorAll('.search-results-4-grid')); // Selector que engloba cada producto
        if(items.length==0){
            items = Array.from(document.querySelectorAll('.search-results-list'));
        }
        return items.slice(0, 5).map(item => {
            const name = item.querySelector('.subTitle-rebrand')?.innerText.trim(); // Obtiene el nombre del producto
            const price = item.querySelector('.copy10.medium')?.innerText.trim(); // Obtiene el precio
            // const ratingElement = item.querySelector('.ratings');
            const rating = item.querySelector('.ratings') ?.getAttribute('data-rating'); // Asegúrate de que el elemento existe antes de intentar obtener el atributo
            const imageLink = item.querySelector('img.jsx-1996933093')?.src;
            const articleLink = item.querySelector('.pod-link')?.href;
            return { name, price, rating, imageLink, articleLink, page: "Falabella" }; // Retorna un objeto con toda la información
        });
    });

    await browser.close();

    productDetails.map((product) => {
        product.price = parseInt(product.price.substring(2).replaceAll(".", ''));
        product.rating = parseFloat(product.rating);
    });

    productDetails.sort((a, b) => a.price - b.price);

    return productDetails;
};

module.exports = { falabella };