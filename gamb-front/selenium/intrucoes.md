# Como rodar os testes

Primeiro Baixe o chromedriver e o chrome, baixe a versão 138  dos dois <a href="https://googlechromelabs.github.io/chrome-for-testing/#stable">neste site</a>

abra uma env e instale os requirements

nas linhas:

<code>suaplogin = driver.find_element(By.XPATH, "/html/body/div[1]/main/div[2]/div[2]/form/div[1]/div/input[1]")
suaplogin.send_keys("*")
sleep(5)

senhasuap = driver.find_element(By.XPATH, "/html/body/div[1]/main/div[2]/div[2]/form/div[2]/div/div/input")
senhasuap.send_keys("*")
sleep(5)</code>

Altere para seu login no .send_keys()

logo após rode a aplicação e inicie o código do seleniumgamb.py