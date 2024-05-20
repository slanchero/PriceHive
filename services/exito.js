const { chromium } = require("playwright");

// const falabella=
(async (product) => {

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`https://www.exito.com/s?q=${product}`);

    await page.waitForSelector(`.product-grid_fs-product-grid___qKN2`);

    // let attempts = 0;
    // while (attempts < 3) {
    //     try {
    //         await page.hover('button[id="testId-Dropdown-desktop-button"]');
    //         await page.click('button[id="testId-Dropdown-desktop-button"]', { force: true });
    //         await page.waitForSelector('.dropdown-list-item', { state: 'visible', timeout: 2000 });
    //         break; // Salir del bucle si tiene éxito
    //     } catch (error) {
    //         console.log('Reintento de abrir el menú desplegable', attempts + 1);
    //         attempts++;
    //         if (attempts === 3) throw error; // Lanza el error si alcanza el máximo de intentos
    //     }
    // }
    // await page.click('li:has-text("Precio de menor a mayor")'); // Selecciona la opción 'Menor precio'

    // await page.waitForSelector('.subTitle-rebrand');

    const productDetails = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[data-testid="store-product-card"]')); // Selector que engloba cada producto
        // return items.slice(0, 5).map(item => {
        //     const name = item.querySelector('.subTitle-rebrand')?.innerText.trim(); // Obtiene el nombre del producto
        //     const price = item.querySelector('.prices-0')?.innerText.trim(); // Obtiene el precio
        //     // const ratingElement = item.querySelector('.ratings');
        //     const rating = item.querySelector('.ratings') ?.getAttribute('data-rating'); // Asegúrate de que el elemento existe antes de intentar obtener el atributo
        //     const imageLink = item.querySelector('.imagen_plp')?.src;
        //     const articleLink = item.querySelector('a[data-testid="product-link"]')?.href;
        //     return { name, price, rating, imageLink, articleLink, page: "Falabella" }; // Retorna un objeto con toda la información
        // });
        return items;
    });

    console.log(productDetails);
    await browser.close();

    return productDetails;
})("samsung s23");

// module.exports = { falabella };