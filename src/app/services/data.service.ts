import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private todoList : Todo[] = [];

  constructor() { }

  //function to return the tasklist
  getAllTasks(){
     return this.todoList;
  }

  //function to add a new task in the tasklist
  addTask(task:Todo){ 
    task['id'] = Symbol('id'); //create a id for the new task
    this.todoList.push(task);
  }

  //function to update a given task in the tasklist
  updateTask(task:Todo){  

    return new Promise((resolve,reject)=>{
      try{
        let item = this.todoList.find((item) => {
          return item.id == task.id;
        });
        if(item != undefined){
          let key:keyof Todo;
          for(key in item){
            (item[key] as any) = task[key];
          }
        }
          resolve('success')   
      }
      catch{
        reject('error')
      }
    })
    
  }

  deleteTask(id:number){
    this.deleteTaskByKey('id',id);
  }


  //utility functions private to the class --------------

  // function that accepts a key and a value -> updates the task list by removing the object which contains the value
  private deleteTaskByKey(key:keyof Todo,value:any){
    this.todoList = this.todoList.filter((item)=>{
      return item[key] != value;
    }) 
  }

}
