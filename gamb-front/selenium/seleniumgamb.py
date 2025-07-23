import tempfile
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select

options = Options()
# options.add_argument("--headless")  # opcional: sem abrir janela
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--window-size=1380,1100")

# usar um diretório temporário para evitar conflitos de perfil
options.add_argument(f"--user-data-dir={tempfile.mkdtemp()}")

driver = webdriver.Chrome(options=options)

driver.get("http://localhost:5173/")

sleep(5)

acesso = driver.find_element(By.XPATH, "/html/body/div/header/div/nav/ul/li[5]/button")
acesso.click()
sleep(5)

suap = driver.find_element(By.XPATH, "/html/body/div/div/div/aside/div[2]/form/div/div[4]/div/button[1]")
suap.click()
sleep(5)

suaplogin = driver.find_element(By.XPATH, "/html/body/div[1]/main/div[2]/div[2]/form/div[1]/div/input[1]")
suaplogin.send_keys("*")
sleep(5)


senhasuap = driver.find_element(By.XPATH, "/html/body/div[1]/main/div[2]/div[2]/form/div[2]/div/div/input")
senhasuap.send_keys("*")
sleep(5)

submitsuap = driver.find_element(By.XPATH, "/html/body/div[1]/main/div[2]/div[2]/form/div[5]/input")
submitsuap.click()
sleep(7)

abrirchamadobtn = driver.find_element(By.XPATH, "/html/body/div/aside/div/aside/div/div[1]/div/button[1]")
abrirchamadobtn.click()
sleep(5)

titulochamado = driver.find_element(By.XPATH, "/html/body/div/aside/div[2]/div/form/div[1]/div/input")
titulochamado.send_keys("Meu computador não liga")
sleep(3)

descricaochamado = driver.find_element(By.XPATH, "/html/body/div/aside/div[2]/div/form/div[2]/div/input")
descricaochamado.send_keys("Após eu ter corrido com ele na chuva, ele parou de ligar, coloquei no arroz e isso não resolvou.")
sleep(3)

modelochamado = driver.find_element(By.XPATH, "/html/body/div/aside/div[2]/div/form/div[3]/div/input")
modelochamado.send_keys("Notebook acer nitro")
sleep(3)

btnacessoriochamado = driver.find_element(By.XPATH, "/html/body/div/aside/div[2]/div/form/div[4]/button")
btnacessoriochamado.click()
sleep(3)

acessoriochamado = driver.find_element(By.XPATH, "/html/body/div/aside/div[2]/div/form/div[5]/div[1]/div/input")
acessoriochamado.send_keys("Fonte do notebook")
sleep(4)

btnenviarchamado = driver.find_element(By.XPATH, "/html/body/div/aside/div[2]/div/form/div[6]/button[2]")
btnenviarchamado.click()
sleep(5)

alert = driver.switch_to.alert
alert.accept()
sleep(5)

selectstatusfiltro = driver.find_element(By.XPATH, "/html/body/div/aside/main/aside/div/form/div/div[2]/div[2]/div[3]/select")
select_status_filtro = Select(selectstatusfiltro)
select_status_filtro.select_by_value('1')
sleep(5)

detalhebtn = driver.find_element(By.XPATH, "/html/body/div/aside/main/aside/div/div[3]/table/tbody/tr[1]/td[1]/button")
detalhebtn.click()
sleep(5)
print("Teste completo")

driver.quit()
