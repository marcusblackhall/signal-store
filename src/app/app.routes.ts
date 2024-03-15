import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'todos',
    loadComponent: () => import("./todos-list/todos-list.component").then((m) => m.TodosListComponent)
  }
];
