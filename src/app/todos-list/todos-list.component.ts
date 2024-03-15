import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TodosFilter, TodosStore } from '../store/todo.store';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [NgStyle, MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatListModule, MatIconModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {


  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {

    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter  = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }

  async onTodoToggled(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);

  }



  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    console.log(`deleting ${id}`);
    event.stopPropagation();
    await this.store.deleteToDo(id);
  }

  strikeIfCompleted(completed: boolean) {
    if (completed) {
      return 'line-through' ;
    }
    return  'none';
  }


}
