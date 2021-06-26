import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
@Input() teacherName = ""; 
taskDateRange: string[] = [];
newTask: string = "";

  constructor() {
   }

  ngOnInit(): void {}
  ngOnChanges(){}
  

  fetchTask(date: any){
    console.log(date)
    this.taskDateRange = date;
  }
  
  newTaskAdded(text: string){
    this.newTask = text;
    console.log("new task added main-content")
  }

}
