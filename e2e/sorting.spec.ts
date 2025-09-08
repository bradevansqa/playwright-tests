import { test, expect } from './fixtures';

test('Sorting feature functionality', async ({ page, login }) => {
  await login(); 
  await page.locator('.title:has-text("Products")').waitFor({ state: 'visible' });
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // Step 4: Verify products are sorted by price (low to high)
  const pricesLowToHigh = await page.locator('.inventory_item_price').allTextContents();
  const pricesNumberLowToHigh = pricesLowToHigh.map(p => parseFloat(p.replace('$', '')));
  const sortedLowToHigh = [...pricesNumberLowToHigh].sort((a, b) => a - b);
  expect(pricesNumberLowToHigh).toEqual(sortedLowToHigh);

  // Step 5: Select "Price (high to low)" from the sorting dropdown
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  // Step 6: Verify products are sorted by price (high to low)
  const pricesHighToLow = await page.locator('.inventory_item_price').allTextContents();
  const pricesNumberHighToLow = pricesHighToLow.map(p => parseFloat(p.replace('$', '')));
  const sortedHighToLow = [...pricesNumberHighToLow].sort((a, b) => b - a);
  expect(pricesNumberHighToLow).toEqual(sortedHighToLow);
  
  // Step 7: Verify products are sorted by name (Z to A)
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  const namesZToA = await page.locator('.inventory_item_name').allTextContents();
  const sortedNamesZToA = [...namesZToA].sort().reverse(); 
  expect(namesZToA).toEqual(sortedNamesZToA);

    // Step 8: Verify products are sorted by name (A to Z)
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const namesAToZ = await page.locator('.inventory_item_name').allTextContents();
    const sortedNamesAToZ = [...namesAToZ].sort();
    expect(namesAToZ).toEqual(sortedNamesAToZ);

});