import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../services/data.service';
import {Todo} from '../models/todo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: Todo[] = [];
  today: any = new Date().toString().split('T')[0];
  closeResult: string = '';
  errorMessage:string = '';
  showValidationErrors:boolean = false;


  createTaskForm = new FormGroup({
    taskName: new FormControl('',[Validators.required,this.noWhitespaceValidator]),
    dueDate: new FormControl(''),
  });

  updateTaskForm = new FormGroup({
    id: new FormControl(''),
    taskName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    dueDate: new FormControl(''),
    completed: new FormControl(''), 
  });



  constructor(private dataService:DataService,private modalService: NgbModal){ 
  }

  ngOnInit(): void{
    this.todoList = this.dataService.getAllTasks();
  }

  //function that creates a new task on submition of the  create task form
  createNewTask(){ 

    let taskName = this.createTaskForm.get('taskName')!.value;
    let dueDate = this.createTaskForm.get('dueDate')!.value;
    let newTask = new Todo(taskName,dueDate,false)
    
    this.dataService.addTask(newTask);
    this.createTaskForm.reset();
  }

  //function that updates a existing task on submition of the update task form
  updateTask(){

    this.dataService.updateTask(this.updateTaskForm.value).then((response)=>{
      this.modalService.dismissAll();
      this.updateTaskForm.reset();
      this.populateListView();
    }).catch((error)=>{
      console.log('Error occured');
    });
  }

  //function that updates a existing task to 'completed' status
  completeTask(task:Todo){

    //check if a given task is beyond its due date -> if true , it cannot be updated to completed 
    if(this.checkTaskIsPastDueDate(task.dueDate)){
        this.showValidationErrors = true;
        this.errorMessage = 'Task is past due date. Cannot be completed';
        setTimeout(()=>{
          this.showValidationErrors = false;
          this.errorMessage = '';
        },5000)
        return;
    }
    task.completed = !task.completed;
    this.populateListView();
  }

  //function that deletes a existing task by its id
  deleteTask(id:number=0){

    this.dataService.deleteTask(id);
    this.populateListView();
  }

  //function to open the edit modal
  open(modal:TemplateRef<any>,task:Todo) {
    this.populateEditModal(task);
    this.modalService.open(modal);
  }

  //function that populates the update task form on opening the edit modal
  populateEditModal(task:Todo){
    this.updateTaskForm.patchValue({
      taskName : task.taskName,
      dueDate : task.dueDate,
      id: task.id,
      completed: task.completed
    })
  }

  //function that fetches the todoList
  populateListView(){ 
    this.todoList = this.dataService.getAllTasks();
  }

  //function that fetches the current date in the format yyyy-mm-dd
  getToday(){
    return new Date().toISOString().split('T')[0];
  }

  //function that verifies if a task is past its due date
  checkTaskIsPastDueDate(date:string){
    if(new Date(date) < new Date(this.getToday())){
      return true;
    }
    return false;
  }

  //function to validate if the input is empty
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
