import { expect, test } from "@playwright/test";

test.describe("Onboarding", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });
  test("should have correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Onboarding");
  });

  test("should create a new account", async ({ page }) => {
    test.setTimeout(240000)
    await page.getByRole("textbox", { name: "E-Mail E-Mail*" }).click();
    await page
      .getByRole("textbox", { name: "E-Mail E-Mail*" })
      .fill("test@test.ts");
    await page.getByRole("textbox", { name: "Passwort Passwort*" }).click();
    await page
      .getByRole("textbox", { name: "Passwort Passwort*" })
      .fill("testtest");
    await page.getByRole("button", { name: "Account erstellen" }).click();
    // Person
    await page.getByRole("textbox", { name: "Name Name*" }).click();
    await page.getByRole("textbox", { name: "Name Name*" }).fill("Max");
    await page.getByRole("textbox", { name: "Name Name*" }).press("Tab");
    await page
      .getByRole("textbox", { name: "Telefonnummer Telefonnummer*" })
      .fill("+4915115322541");
    await page.locator("div:nth-child(3) > .relative > .inline-flex").click();
    await page
      .getByRole("spinbutton", { name: "Anzahl der Einheiten Anzahl" })
      .fill("12");
    await page
      .getByRole("button", { name: "Integrationspartner auswählen" })
      .click();
    await page.getByLabel('Casavi', { exact: true }).getByText('Casavi').click();
    await page.getByTestId('basic-info-form-button').click();
    // Ansage
    await page.getByRole("textbox", { name: "Ansage Ansage*" }).click();
    await page
      .getByRole("textbox", { name: "Ansage Ansage*" })
      .fill("Hallo, test");
    await page
      .getByRole("textbox", { name: "Telefonnummer Telefonnummer*" })
      .click();
    await page
      .getByRole("textbox", { name: "Telefonnummer Telefonnummer*" })
      .fill("+4915115322541");
    await page.getByRole("button", { name: "Weiterleitung testen" }).click();
    await expect(page.getByRole("button", { name: "Weiterleitung getestet" })).toBeVisible();
    await page.getByRole("button", { name: "Weiter", exact: true }).click();

    // Completion
    const button = page.getByTestId("dashboard-button");
    await expect(button).toBeVisible();
  });

  
});
