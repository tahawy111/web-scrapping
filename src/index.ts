// step (1) Import puppeteer
import puppeteer, { Browser } from "puppeteer";

const url: string = "https://www.amazon.com/s?k=amazonbasics";

interface ProductInterface {
  title?: string | null;
  image?: string | null;
  price?: string | null;
}

// step (2) make an async function
(async () => {
  const browser: Browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  const productsHandles = await page.$$(".puis-card-container");

  const products: ProductInterface[] = [];

  for (const productHandle of productsHandles) {
    const product = {
      title: await productHandle.evaluate(
        (document) => document.querySelector("h2 > a > span")?.textContent
      ),
      price: await productHandle.evaluate(
        (document) =>
          document.querySelector(".a-price > .a-offscreen")?.textContent
      ),
      image: await productHandle.evaluate((document) =>
        document.querySelector(".s-image")?.getAttribute("src")
      ),
    };

    products.push(product);
  }

  console.log(products);

  await browser.close();
})();
