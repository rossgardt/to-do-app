# Task Management App

The app is a task management tool created using Angular and Bootstrap

## Functionality
A user can perform the following functionalities
- Create Task
    - User can provide a task name and due date.
- Update Task
    - User can update the task name and due date for a particular task.   
- Delete Task
    - User can delete any task by clicking on delete icon.  
- Complete Task
    - User can mark a task as complete. Only those tasks that have not crossed its due date can be marked complete. 

## Project Structure

In src/app folder,
- todo folder
    - Contains the Todo Component that displays the task list
- services folder
    - Contains the Data Service used to perform CRUD operations on the task list
- models folder
    - Contains the class ToDo that defines the structure of a particular task.  

## Tech Stack
 - Angular 11
 - Bootstrap

## Development server

Run `ng build` to build the project.
Run `ng serve` to launch the tool
