import { Injectable } from '@angular/core';
import { TODOS } from './data/todo.data';
import { Todo } from './model/todo.model';
import { TodosFilter } from './store/todo.store';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
  }

  async getTodos() {
    await sleep(1000);
    return TODOS;
  }

  async getTodosFiltered(filter: TodosFilter) {
    await sleep(1000);
    return TODOS.filter(td => (
      filter === "all" ||
      (td.completed && filter == "completed") ||
      (!td.completed && filter == "pending")

    )
    )
  }

  async addTodo(todo: Partial<Todo>) {
    await sleep(1000);
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...todo
    } as Todo
  }

  async deleteTodo(id: string) {

    await sleep(1000);

  }
  async updateTodo(id: string, completed: boolean) {

    await sleep(500);

  }

}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
