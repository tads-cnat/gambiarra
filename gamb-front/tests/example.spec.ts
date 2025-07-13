import { test, expect } from '@playwright/test';

test.describe("Index", () => {
    test("deve ter os elementos corretos e textos", async ({ page }) =>{ //testar conteudo de elementos
        await page.goto("http://localhost:5173/") // navega para o index

        await expect(page).toHaveTitle("Gambi"); //checa se tem o title "Gambi"
        await expect(page.getByRole('heading', { name: /Olá! somos o Gambiarra/i })).toContainText("Olá! somos o Gambiarra");

        await expect(page.getByText(/conserto de computadores/i)).toBeVisible();
        await expect(page.getByText(/IFRN-CNAT/i)).toBeVisible();
    })



})  