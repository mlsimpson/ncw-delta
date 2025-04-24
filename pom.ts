import { test, expect, Page } from '@playwright/test';

export class BookFlightPage {
  constructor(private readonly page: Page) { }

  async goto() {
    await this.page.goto('/flightsearch/book-a-flight');
  }

  async selectOrigin(origin: string) {
    await this.page.getByRole('link', { name: 'Departure Airport or City' }).click();
    await this.page.getByRole('textbox', { name: 'Origin City or Airport' }).fill(origin);
    await this.page.getByRole('listitem').filter({ hasText: origin }).first().click();
  }

  async selectDestination(destination: string) {
    await this.page.getByRole('link', { name: 'Destination Airport or City' }).click();
    await this.page.getByRole('textbox', { name: 'Destination City or Airport' }).fill(destination);
    await this.page.getByRole('listitem').filter({ hasText: destination }).first().click();
  }

  async selectTripType(triptype: string) {
    await this.page.getByRole('combobox', { name: 'Trip Type' }).click();
    await this.page.getByRole('option', { name: triptype }).click();
  }

  async selectDates(departing: string, returning: string) {
    // open date picker
    await this.page.getByRole('button', { name: 'departureDate' }).click();

    // select departing and returning date and close date picker
    await this.page.getByRole('link', { name: departing }).first().click();
    await this.page.getByRole('link', { name: returning }).first().click();
    await this.page.getByRole('button', { name: 'done' }).click();
  }

  async performSearch() {
    await this.page.getByRole('button', { name: 'SEARCH Flight Search' }).click();
  }
}

