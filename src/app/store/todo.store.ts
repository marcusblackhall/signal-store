import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../model/todo.model";
import { TodoService } from "../todo.service";
import { computed, inject } from "@angular/core";

export type TodosFilter = "all" | "completed" | "pending";

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  filter: TodosFilter
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "all"
}

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, todosService = inject(TodoService)) => (
      {

        async loadAll() {
          patchState(store, { loading: true });

          const todos = await todosService.getTodos();
          patchState(store,{todos, loading: false})
        },
        async addTodo(title:string){
          const todo = await todosService.addTodo({title: title,completed: false});
          patchState(
            store , (state) =>(
            { todos : [...state.todos,todo] }
            )
          );

        },
        async deleteToDo(id:string){
          patchState(store, { loading: true });
          await todosService.deleteTodo(id);
          patchState(store,(state) => ({
            todos : state.todos.filter(td => td.id !== id)
          }));
          patchState(store, { loading: false });

        },

        async updateTodo(id:string,completed:boolean){
          await todosService.updateTodo(id,completed);

          patchState(store,(state) => ( { todos : state.todos.map(td =>

            td.id == id ?   {...td,completed } : td


            )}))

        },

        async updateFilter(filter:TodosFilter){

          patchState(store,{filter});
        }

      }
    )

  ),
  withComputed(
    (state) => ({
      filteredTodos : computed(()=>{
        const todos = state.todos();

        switch(state.filter()){
          case "all" :
            return todos;
          case "pending" :
            return todos.filter(td => ! td.completed);
          case "completed" :
            return todos.filter(td =>  td.completed);
        }

      })
    })
  )
);

