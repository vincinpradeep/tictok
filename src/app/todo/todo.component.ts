import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ITask } from '../model/iTask';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updatedId!: any;
  isEditEnable: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInprogressTask(i: number) {
    this.inprogress.splice(i, 1);
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  editTask(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updatedId = i;
    this.isEditEnable = true;
  }
  updateTask() {
    this.tasks[this.updatedId].description = this.todoForm.value.item;
    this.tasks[this.updatedId].done = false;
    this.todoForm.reset();
    this.updatedId = undefined;
    this.isEditEnable = false;
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
