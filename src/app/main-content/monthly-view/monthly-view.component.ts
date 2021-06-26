import { Component, ElementRef, Input, OnInit,EventEmitter, ViewChild, Output } from '@angular/core';
import { taskDetails } from '../tasks-details.model'
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  styleUrls: ['./monthly-view.component.css']
})
export class MonthlyViewComponent implements OnInit {
  // @Input() CalendarTasks = "";
  @Output() reqTaskDate = new EventEmitter<string[]>();
  @Output() newTaskAdded = new EventEmitter<string>();
  @ViewChild('f') taskDetalsForm: any;
    task = {
    id: 0,
    teacher: '',
    date_of_class: '',
    batch: '',
    slot: '',
    taskDetails: ''
  };
  initialized:boolean = false;
  tasks_to_fetch: string = "";
  taskDescription = ''
  submitted = false;
  date: any;
  dateTasks: string = "";
  select_date: number = 0;
  day_idx: number = 0;
  defaultOption = '';
  defaultBatch = 'Batch-1';
  defaultSlot = 'Slot-1';
  taskDate: string = ''
  curr_date = new Date;
  cnt: number = 0;
  modal_display: boolean = false;
  curr_week: number = 0;
  prevMonthDays: {date: number, month: number, year: number}[] = [];
  currentMonthDays: {date: number, month: number, year: number}[] = [];
  nextMonthDays: {date: number, month: number, year: number}[] = [];
  weekDays: number[] = [];
  singleDay: number[] = [];
  teachers_list: any;
  lastDay: any;
  firstDayOfWeek: number = 0;
  lastDayOfWeek: number = 0;
  prevLastDay: any;
  firstDayIndex: any; 
  lastDayIndex: any;
  nextDays: number = 0;
  viewName: string="";
  weekCalendar: Boolean = false;
  monthCalendar: Boolean = false;
  dayCalendar: Boolean = false;
  names_of_weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months: string[] = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

  
  display_date: string = "";
  tasksList: any;
  constructor(public tkService: TasksService) {}

  ngOnInit(): void {
    this.monthCalendar = true;
    this.date = new Date();
    this.viewName = 'Month';
    this.renderMonthCalendar();
    this.initialized = true;
  }

  ngOnChanges(){

  }
  async getallteachers(){
    let req_teachers = await this.tkService.getallteachers();
    this.teachers_list = req_teachers
  }




  updateValues() {
    this.prevMonthDays=[];
    this.currentMonthDays= [];
    this.nextMonthDays= [];
    this.lastDay=0;
    this.prevLastDay=0;
    this.firstDayIndex=0; 
    this.lastDayIndex=0;
    this.nextDays = 0;
  }

  prev(){
    if(this.viewName === 'Month'){
      this.updateValues();
      this.date.setMonth(this.date.getMonth()-1);
      this.renderMonthCalendar();
    } else if(this.viewName === 'Week'){
      this.curr_week += 1
      this.renderWeekCalendar("prev");
    } else if(this.viewName === "Day"){
      this.cnt -= 1;
      this.renderDayCalendar("prev");
    }
  }

  next(){
    if(this.viewName === 'Month'){
      this.updateValues();
      this.date.setMonth(this.date.getMonth()+1);
      this.renderMonthCalendar();
    }else if(this.viewName === 'Week'){
      this.curr_week -= 1
      this.renderWeekCalendar("next");
    } else if(this.viewName === "Day"){
      this.cnt += 1
      this.renderDayCalendar("next")
    }
  }
  
  renderMonthCalendar() {
    this.date.setDate(1);
    this.display_date = this.months[this.date.getMonth()] + " " + this.date.getFullYear();
    this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.firstDayIndex = this.date.getDay();
    this.lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth()+1,0).getDay();
    this.nextDays = 7-this.lastDayIndex-1;
    
      for(let x = this.firstDayIndex; x > 0; x--){
        this.prevMonthDays.push({
          date: this.prevLastDay.getDate()-x+1,
          month: this.prevLastDay.getMonth()+1,
          year: this.prevLastDay.getFullYear()
        });
      }
      for(let i = 1; i<= this.lastDay; i++){
        this.currentMonthDays.push({
          date: i,
          month: this.date.getMonth()+1,
          year: this.date.getFullYear()
        });
      }
      let start = this.formatDate(1, this.date.getMonth()+1, this.date.getFullYear())
      let end = this.formatDate(this.lastDay, this.date.getMonth()+1, this.date.getFullYear())
      let firstDayOfMonth = `${start[2]}-${start[1]}-${start[0]}`
      let lastDayOfMonth = `${end[2]}-${end[1]}-${end[0]}`
      this.reqTaskDate.emit(['monthly', firstDayOfMonth, lastDayOfMonth])
      for(let j=1; j <= this.nextDays; j++){
        this.nextMonthDays.push({
          date: j,
          month: this.date.getMonth()+2 ,
          year: this.date.getFullYear()
        });
      }
    }

    renderWeekCalendar(type: string){
      this.weekDays = [0,0,0,0,0,0,0]
      let first: any, last: any;
      if(this.curr_week === 0) {
        first = new Date(this.curr_date.setDate(this.curr_date.getDate() - this.curr_date.getDay()));
      } else if (type === "prev"){
        first= new Date(this.curr_date.setDate((this.curr_date.getDate()-7) - this.curr_date.getDay()));
      } else if (type === "next"){
        first = new Date(this.curr_date.setDate((this.curr_date.getDate()+7) - this.curr_date.getDay()));
      }
      last = new Date(this.curr_date.setDate(this.curr_date.getDate() - this.curr_date.getDay()+6));
      this.firstDayOfWeek = first.getDate();
      this.lastDayOfWeek = last.getDate();
      let curr_month = this.curr_date.getMonth();
      let t = 0
      let start = this.formatDate(first.getDate(), first.getMonth()+1, first.getFullYear())
      let end = this.formatDate(last.getDate(), last.getMonth()+1, last.getFullYear())
      let start_date = `${start[2]}-${start[1]}-${start[0]}`
      let end_date = `${end[2]}-${end[1]}-${end[0]}`
      this.reqTaskDate.emit(['weekly', start_date, end_date])

      for(let idx=6; idx>= 0; idx--){
        if(this.lastDayOfWeek >0){
          this.weekDays[idx] = this.lastDayOfWeek
          this.lastDayOfWeek -= 1
        } else {
          this.weekDays[t] = this.firstDayOfWeek;
          this.firstDayOfWeek += 1
          t += 1
        }
      }
      let combination = false;
      for(let i = 0; i<7; i++){
        if ((this.weekDays[i] === 30 || this.weekDays[i] === 31 || this.weekDays[i] === 28) && (this.weekDays[i+1] === 1)){
          combination = true;
          break
        }
      }
      if(combination){
        this.display_date = `${this.months[curr_month-1]} - ${this.months[curr_month]} ${this.curr_date.getFullYear()}`
      } else {
        this.display_date = `${this.months[curr_month]} ${this.curr_date.getFullYear()}`
      }

    }

    renderDayCalendar(type: string){
      let dateObj = new Date();    
      if(type === "prev"){
        dateObj.setDate(dateObj.getDate() + this.cnt); 
      } else if (type === "next"){
        dateObj.setDate(dateObj.getDate() + this.cnt); 
      }
      this.display_date = `${this.months[dateObj.getMonth()]} ${dateObj.getFullYear()}`
      this.select_date = dateObj.getDate();
      this.day_idx = dateObj.getDay();

      let start = this.formatDate(dateObj.getDate(), dateObj.getMonth()+1, dateObj.getFullYear())
      let start_date = `${start[2]}-${start[1]}-${start[0]}`
      this.reqTaskDate.emit(['day', start_date, ''])
    }

    check_curr_day(day: number){
      if(day=== new Date().getDate() && this.date.getMonth() === new Date().getMonth()){
        return true
      }
      return false
    }

    updateViews(day: boolean, week: boolean, month: boolean) {
      this.dayCalendar = day;
      this.weekCalendar = week;
      this.monthCalendar = month;
    }
    
    viewType(name: string){
      this.viewName = name;
      if (name === 'Week'){
        this.date = new Date();
        this.updateViews(false, true, false);
        this.curr_date = new Date;
        this.curr_week = 0;
        this.renderWeekCalendar('');
      } else if (name === 'Month'){
        this.date = new Date();
        this.updateViews(false, false, true);
        this.updateValues();
        this.renderMonthCalendar();
      } else if(name === "Day") {
        this.date = new Date();
        this.updateViews(true, false, false);
        this.curr_date = new Date;
        this.cnt = 0;
        this.renderDayCalendar('');
      }
    }

    formatDate(date:any, month:any, year:any){
      let d = date;
      let m = month;
      let y = year;
      if(d <= 9){
        d = `0${d}`
      } else {
        d = `${d}`
      }
      if(m < 10){
        m = `0${m}`
      }else {
        m = `${m}`
      }
      y = `${y}`
      return [d,m,y]
    }

    addTask(p: any = 'test'){
      this.modal_display = true
      this.getallteachers();
       let res = this.formatDate(p.date, p.month, p.year)
      let d = res[0]
      let m = res[1]
      let y = res[2]
      setTimeout(() => {
        const dt = document.querySelector('#taskDate') as any
        dt['value'] = `${y}-${m}-${d}`
      }, 200)
          
    }

    close(){
      this.modal_display = false;
    }

    async onSubmit(){
      this.submitted = true;
      this.modal_display = false;
      this.task.teacher = this.taskDetalsForm.value.teacherName;
      const dt = document.querySelector('#taskDate') as any
     
      this.task.date_of_class =  dt['value']
      this.task.batch = this.taskDetalsForm.value.batchName;
      this.task.slot = this.taskDetalsForm.value.slotName;
      this.task.taskDetails = this.taskDetalsForm.value.taskDescription;
      this.taskDescription = ''
      const res = await this.tkService.addTask(this.task);
      this.newTaskAdded.emit(dt['value'])
      alert(res)
    }

    async viewTask(obj: any = 'test'){
      console.log("view task on particular day ")
      let res = this.formatDate(obj.date, obj.month, obj.year)
      let currDate = `${res[2]}-${res[1]}-${res[0]}`
      this.reqTaskDate.emit(['day', currDate, ''])
    }

  }

