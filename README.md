to add teacher to database
`http://localhost:3000/addteacher`

to add task to database
`http://localhost:3000/getdata/${task.date_of_class}` and (`http://localhost:3000/addslot`, obj)

to get all tasks based on months or weeks
`http://localhost:3000/getalltasks/${startDate}/${endDate}`

to get teacher tasks based on filterd week or month
`http://localhost:3000/getteachertasks/${startDate}/${endDate}/${name}`

to get all teachers in sidebar
`http://localhost:3000/getallteachers`

to get teachers curr date tasks
`http://localhost:3000/getteacherdatetask/${date}/${name}`

to get tasks when clicked on specified date
`http://localhost:3000/getdata/${task}`

#to delete task from database
`http://localhost:3000/deletedata/${id}`

Database design 
//create table to store slots
let sql = 'CREATE TABLE slots (id INT AUTO_INCREMENT PRIMARY KEY, batch VARCHAR(255), slot VARCHAR(255), teacher VARCHAR(255), date_of_class DATE)';

//create table to store teachers name
let sql = 'CREATE TABLE teachers (id INT AUTO_INCREMENT PRIMARY KEY, teacher VARCHAR(255))';



the database contains two tables 
+---------------------+
| Tables_in_nodemysql |
+---------------------+
| slots               |
| teachers            |
+---------------------+

teachers table
+----+----------+
| id | teacher  |
+----+----------+
|  1 | Naveen   |
|  2 | Kiran    |
|  3 | Sandeep  |
|  4 | Kavya    |
|  5 | Ruchitha |
|  6 | Harsha   |
|  7 | Madhu    |
+----+----------+

slots table to store and fetch tasks
+----+---------+--------+---------+---------------+---------------------------------+
| id | batch   | slot   | teacher | date_of_class | taskDetails                     |
+----+---------+--------+---------+---------------+---------------------------------+
|  3 | Batch-1 | Slot-1 | Sandeep | 2021-06-07    |                                 |
|  4 | Batch-1 | Slot-1 | Sandeep | 2021-06-15    |                                 |
|  5 | Batch-1 | Slot-1 | Kavya   | 2021-06-23    |                                 |
|  6 | Batch-1 | Slot-1 | Sandeep | 2021-06-24    |                                 |
|  7 | Batch-1 | Slot-1 | Sandeep | 2021-06-21    |                                 |
|  9 | Batch-1 | Slot-1 | Sandeep | 2021-05-11    |                                 |
| 11 | Batch-1 | Slot-1 | Harsha  | 2021-06-16    |                                 |
| 12 | Batch-1 | Slot-1 | Sandeep | 2021-06-10    |                                 |
| 13 | Batch-1 | Slot-3 | Sandeep | 2021-06-10    |                                 |
| 15 | Batch-1 | Slot-3 | Sandeep | 2021-06-22    |                                 |
| 16 | Batch-1 | Slot-1 | Kavya   | 2021-06-08    | teach merge sort implementation |
+----+---------+--------+---------+---------------+---------------------------------+

# PrepCodingAssessmentFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

