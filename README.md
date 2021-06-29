## Postman API documentation

https://documenter.getpostman.com/view/16239375/TzedhkB7

## Project Demo Video
https://drive.google.com/file/d/1_ETV0jyM1sTKIOy3ligJu7f25ULoiOip/view?usp=sharing

## Database design 
the database contains two tables teachers and slots.
teachers table is used to store and fetch teachers name from database. 
slots table is used to all the tasks created dynamically

//create table to store tasks
let sql = 'CREATE TABLE slots (id INT AUTO_INCREMENT PRIMARY KEY, batch VARCHAR(255), slot VARCHAR(255), teacher VARCHAR(255), date_of_class DATE)';

//create table to store teachers name
let sql = 'CREATE TABLE teachers (id INT AUTO_INCREMENT PRIMARY KEY, teacher VARCHAR(255))';


![Screenshot (333)](https://user-images.githubusercontent.com/68271034/123524067-7bee4600-d6e5-11eb-8437-38d8268a38d2.png)
![Screenshot (334)](https://user-images.githubusercontent.com/68271034/123524102-adffa800-d6e5-11eb-9047-22bf87eec758.png)



# PrepCodingAssessmentFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `npm run start:server` to start the backend server

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

