import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prepCoding-assessment-frontend';
  teacherName: string = '';

  fetchTeacherTasks(teacher: string){
    this.teacherName = teacher;
  }
}
