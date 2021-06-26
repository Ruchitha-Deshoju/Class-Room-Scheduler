import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() taskDateRange: string[] = []; //array
  @Input() teacherName: string = "";
  @Input() newTaskAdded: string = "";
  tasksList: any;
  initialized:boolean = false;
  constructor(public tkService: TasksService) {}

  ngOnInit(): void {
    this.initialized = true;
    this.fetchData(this.taskDateRange, '')
    //fetch based on month, week, day
  }

  ngOnChanges(){
    if(this.initialized){
      console.log("this new task in taskcomponent", this.newTaskAdded)
      console.log("calling ng ON changes in tasks component")
      this.fetchData(this.taskDateRange, this.teacherName);
    }
  }

  dateFormat(date: string){
    let t = date.substring(0, 10)
    return t
  }

  async deleteTask(obj: any){
    let req_tasks = await this.tkService.deleteTask(obj.id);
    this.tasksList = this.fetchData(this.taskDateRange, this.teacherName)
  }

  async fetchData(dates: any, teacher: string) {
    if(teacher === ''){
      if(dates[0] === 'monthly' || dates[0] === 'weekly'){ 
        let req_tasks = await this.tkService.getalltasks( dates[1], dates[2], dates[0])
        this.tasksList = req_tasks
      } else if( dates[0] === 'day'){
        let req_tasks = await this.tkService.getCurrDateTasks(dates[1])
        this.tasksList = req_tasks
      }
    } else {
      if(dates[0] === 'monthly' || dates[0] === 'weekly'){
        let req_tasks = await this.tkService.getteachertasks(teacher, dates[1], dates[2])
        this.tasksList = req_tasks
      } else if(dates[0] === 'day'){
        let req_tasks = await this.tkService.getTeacherCurrDateTasks(teacher, dates[1])
        this.tasksList = req_tasks
      }
    }  
  }

}
