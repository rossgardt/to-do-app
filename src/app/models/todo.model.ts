export class Todo{
     
     id?:Symbol;
     taskName:string = '';
     dueDate:string = '';
     completed:boolean = false

    constructor(task:string,dueDate:string,completed:boolean){
        this.taskName = task;
        this.dueDate = dueDate;
        this.completed = completed;
    }

}