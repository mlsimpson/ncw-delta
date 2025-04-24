import { test, expect } from '@playwright/test';
import { BookFlightPage } from './pom'

test.describe('Book a Flight', () => {

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
  });

  test('Can not select departure date in the past', async ({ page }) => {
    const pom = new BookFlightPage(page);
    await pom.goto();

    const tDate = new Date();
    const today = tDate.getDate();

    const yDate = new Date(tDate);
    yDate.setDate(yDate.getDate() - 1);
    const yesterday = yDate.getDate();

    await page.getByRole('button', { name: 'departureDate' }).click();

    // if at start of month, may not see yesterday in the current view
    if (today > 1) {
        await expect(page.locator('.dl-state-disabled').filter({ hasText: String(yesterday) })).toBeVisible();
    }
  }),

  test('7 Day Round Trip Flight from Orlando to Atlanta, 1 Week from Today', async ({ page }) => {
    const pom = new BookFlightPage(page);
    await pom.goto();

    const origin = 'MCO'
    const destination = 'ATL'
    const triptype = 'Round Trip'
    const tDate = new Date();

    // set departing date to today + 7
    const dDate = new Date(tDate);
    dDate.setDate(dDate.getDate() + 7);
    const dDay = dDate.getDate();
    const dMonth = dDate.toLocaleString('default', { month: 'long' });
    const dYear = dDate.getFullYear();
    const departing = dDay + ' ' + dMonth + ' ' + dYear

    // set returning date to today + 14
    const rDate = new Date(tDate);
    rDate.setDate(rDate.getDate() + 14);
    const rDay = rDate.getDate();
    const rMonth = rDate.toLocaleString('default', { month: 'long' });
    const rYear = rDate.getFullYear();
    const returning = rDay + ' ' + rMonth + ' ' + rYear

    await pom.selectOrigin(origin);
    await expect(page.locator('#fromAirportName')).toContainText(origin);

    await pom.selectDestination(destination);
    await expect(page.locator('#toAirportName')).toContainText(destination);

    await pom.selectTripType(triptype)
    await expect(page.locator('#selectTripType')).toContainText(triptype);

    await pom.selectDates(departing, returning);
    await expect(page.locator('.calenderDepartSpan')).toHaveText(dMonth + ' ' + dDay);
    await expect(page.locator('.calenderReturnSpan')).toHaveText(rMonth + ' ' + rDay);

    await pom.performSearch();
    await expect(page).toHaveTitle(/.*Results/);
    await expect(page.getByText('Outbound')).toBeVisible();
  });
});

