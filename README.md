# tugapp
test application for tug company assessment in nest.js 

part1------------------------------------------------

My Package
In this package I implemented a nest.js application with full CRUD operation on these entities as REST Api:
Company, Product, Category and Sub Category. Indeed main entity is product and others are its properties, each product belongs to one company and has category and it may be have sub category.

part2------------------------------------------------


Main Features:
•	Using MySQL as Database
•	Using Redis as Cash for retrieving data on product entity
•	Registering Log On every request
•	Using TypeORM as ORM(middleware between database and application classes)
•	Using github as source code repository with CICD workflow
•	Using Swagger as Test Tools and Endpoints documentation. Users can retrieve api documentation in json and yaml format. The address of swagger documentation is for example www.localhost:3000/docs.
•	Application has 2 environment file for setting parameters. In this file database connection  data, redis settings,… users can copy .env.example and .env.prod.example as template.


part3------------------------------------------------

•	Installation
Perquisite:
1.	Node.js from www.nodejs.org
2.	Nest.js framework  form www.nestjs.com
3.	MySQL form www.appachefriends.org

Database:
1.	Run mysql service on your machine
2.	restore src\db\tug_db.sql in mysql database.
3.	Set database connection in .env file


Application:
1.Clone source code from repository a
2.In the root folder of application run:
npm install and if you have problem run: npm install  --force




 

