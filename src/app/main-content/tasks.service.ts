import { Injectable } from '@angular/core';
import { taskDetails } from './tasks-details.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks_list: taskDetails[] = [];
  constructor(private http: HttpClient) {}

  addTeacher(name: string){
    const localThis = this;
    
    let myPromise = new Promise(function(myResolve, myReject) {
      let obj = {"teacher": name};
      localThis.http.post<any>('http://localhost:3000/addteacher', obj).subscribe((response) => {
          myResolve("teacher added...")
        })
      })
      return myPromise
    }

  addTask(task:taskDetails){
    const localThis = this
    let myPromise = new Promise(function(myResolve, myReject) {
      let obj = {
        "teacher": task.teacher, 
        "slot": task.slot, 
        "batch": task.batch, 
        "taskDetails": task.taskDetails, 
        "date_of_class": task.date_of_class};
      let slot_possible = true;
      localThis.http.get<taskDetails[]>(`http://localhost:3000/getdata/${task.date_of_class}`).subscribe((response) => {
      let tasks = response;
        if(tasks.length === 0){
          slot_possible = true;
        } else {
          tasks.forEach(item => {
            if((item.batch === task.batch && item.slot === task.slot) || (item.slot === task.slot && item.teacher === task.teacher)){
              slot_possible = false;
              myResolve('Slot not available')
            }
          })
        }   
        if(slot_possible){
          localThis.http.post<any>('http://localhost:3000/addslot', obj).subscribe((res) => {
            myResolve('Slot is booked')
          });
        } 
      });
      
    })
    return myPromise
    }

    getalltasks(startDate: string, endDate: string, viewType: string){
      const localThis = this;
      let myPromise = new Promise(function(myResolve, myReject) {
        localThis.http.get<any>(`http://localhost:3000/getalltasks/${startDate}/${endDate}`).subscribe((response)=> {
          myResolve(response)
        })
      })
      return myPromise
    }

    getteachertasks(name: string, startDate: string, endDate: string){
      console.log("get teacher tasks based on dates")
      const localThis = this;
      let myPromise = new Promise(function(myResolve, myReject){
        localThis.http.get<any>(`http://localhost:3000/getteachertasks/${startDate}/${endDate}/${name}`).subscribe((response)=> {
          myResolve(response)
        })
      })
      return myPromise
    }

    getallteachers(){
      const localThis = this;
      let myPromise = new Promise(function(myResolve, myReject) {
        localThis.http.get<any>('http://localhost:3000/getallteachers').subscribe((response)=> {
        myResolve(response)
        })
      })
      return myPromise
    }

    getTeacherCurrDateTasks(name: string, date: string){
      console.log("get teacher durr date tasks service")
      console.log(name, date)
        const localThis = this;
        let myPromise = new Promise(function(myResolve, myReject) {
          localThis.http.get<any>(`http://localhost:3000/getteacherdatetask/${date}/${name}`).subscribe((response) => {
          myResolve(response)
         })
      })
      return myPromise
    }

    getCurrDateTasks(task: any){
      console.log("sevice get currdate tasks")
      const localThis = this
      let myPromise = new Promise(function(myResolve, myReject) {
        localThis.http.get<taskDetails[]>(`http://localhost:3000/getdata/${task}`).subscribe((response) => {
          myResolve(response)
        })
      })
      return myPromise      
    }

    deleteTask(id: number){
      const localThis = this;
      let myPromise = new Promise(function(myResolve, myReject){
        localThis.http.get<any>(`http://localhost:3000/deletedata/${id}`).subscribe((response) => {
          myResolve("task deleted...")
        })
      })
      return myPromise   
    }
    
  }





 