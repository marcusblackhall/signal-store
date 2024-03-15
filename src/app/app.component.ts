import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todo.store';
import { TodosListComponent } from './todos-list/todos-list.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,TodosListComponent,MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'ngrx-signal-store-crash-course';

  store = inject(TodosStore);

  ngOnInit(): void {

    this.loadTodos().then(() => console.log('loaded the todos'))

  }

  async loadTodos(){
    return await this.store.loadAll();
  }
}
