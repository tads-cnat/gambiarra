import { test, expect } from '@playwright/test';

test.describe("Index", () => {
    test("deve ter os elementos corretos e textos", async ({ page }) =>{ //testar conteudo de elementos
        await page.goto("http://localhost:5173/") // navega para o index

        await expect(page).toHaveTitle("Gambi"); //checa se tem o title "Gambi"
        await expect(page.getByRole('heading', { name: /Olá! somos o Gambiarra/i })).toContainText("Olá! somos o Gambiarra"); // checa se o header contém o texto correto

        await expect(page.getByText(/conserto de computadores/i)).toBeVisible();
        await expect(page.getByText(/IFRN-CNAT/i)).toBeVisible();
    })

    test('deve aparecer botões do banner principal', async ({ page }) => {
        await page.goto("http://localhost:5173/") // navega para o index

        await expect(page.getByTestId('saiba-mais-index')).toBeVisible(); //adiciona um testID no componente para identificação
        await expect(page.getByTestId('fale-conosco-index')).toBeVisible(); //adiciona um testID no componente para identificação
    });

    test('deve aparecer todos os cards de cada campus', async ({ page }) => {
        await page.goto("http://localhost:5173/") // navega para o index
        
        await expect(page.getByText(/Campus Natal Central - IFRN/i)).toBeVisible(); //seleciona pelo texto
        await expect(page.getByText(/Campus Zona Norte - IFRN/i)).toBeVisible();
        await expect(page.getByText(/Campus Zona Leste - IFRN/i)).toBeVisible();
        await expect(page.getByText(/Campus Pau dos Ferros - IFRN/i)).toBeVisible();
    });

    test('deve redirecionar para a tela de login', async ({ page }) => {
        await page.goto("http://localhost:5173/") // navega para o index
        await page.getByText(/Acesse já/i).click(); // clica no botão que tem o texto "Acesse já"
        await expect(page).toHaveURL("http://localhost:5173/login") //verifica se foi redirecionado para o login
    });

    test('deve realizar login', async ({ page }) => {
        await page.goto("http://localhost:5173/login"); //navega para tela de login
        await page.getByTestId('user-field').fill('lipe');
        await page.getByTestId('password-field').fill('ZAP123!!');
        await page.getByText(/Entrar/i).click();
        await expect(page).toHaveURL("http://localhost:5173/dashboard")

    })

    test('deve realizar login', async ({ page }) => {
        await page.goto("http://localhost:5173/login"); //navega para tela de login
        await page.getByTestId('user-field').fill('lipe');
        await page.getByTestId('password-field').fill('ZAP123!!');
        await page.getByText(/Entrar/i).click();
        await expect(page).toHaveURL("http://localhost:5173/dashboard")
    })  

})  