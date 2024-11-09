# Gamb Backend

## How to install
- Create a venv with python 3.10 installed.
- Run the command ```pip install -r requirements.txt```
- Use the command ```docker compose build``` and ```docker compose up``` right after.
<strong>(Maybe in this step the django container will start before the postgres container throwing an error. Stopping and running the containers again will solve the problem).</strong>
- Now the API, postgres and pgadmin are running on ports 8000, 5432 and 5050 respectively...

## Swagger documentation
- To access swagger docs you can click on this [link](localhost:8000/swagger/schema/).

## Connecting to pgadmin
- Open a browser at localhost:5000 and enter the credentials:
``` username: admin@admin.com```
``` password: admin```
- Once logged in, add a new server with these credentials:
    ``` Name: any```
    ``` Host name: db```
    ``` Port: 5432```
    ``` Mantainence database: postgres```