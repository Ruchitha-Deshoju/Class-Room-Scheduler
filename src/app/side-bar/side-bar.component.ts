import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { TasksService  } from '../main-content/tasks.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Output() teacherName = new EventEmitter<string>();
  newTeacherName: string = "";
  constructor(public tkService: TasksService) { }

  teachers_list: any;

  ngOnInit(): void {
    this.getallteachers();
    //emit curr month data
  }

  ngOnChanges(){

  }

  getTasks(name: string){
    this.teacherName.emit(name);
  }

  async addTeacher(){
    if(this.newTeacherName !== ""){
      let res = await this.tkService.addTeacher(this.newTeacherName)
    } 
    this.getallteachers();
    this.newTeacherName = ""
  }

  async getallteachers(){
    let req_teachers = await this.tkService.getallteachers();
    this.teachers_list = req_teachers
  }

}
