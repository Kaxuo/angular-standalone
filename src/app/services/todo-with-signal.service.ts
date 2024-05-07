import {Injectable, inject, signal} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../Types/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodosWithSignalService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  http = inject(HttpClient);
  todos = signal<Todo[]>([]);

  getPosts(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(tap(res => this.todos.set(res)));
  }

  createPost(post: Todo) {
    return this.http.post<Todo>(this.url, post).pipe(tap(this._upsertTodo));
  }

  deletePost(id: number) {
    return this.http.delete<Todo>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.todos.set(this.todos().filter(todo => todo.id !== id));
      }),
    );
  }

  private _upsertTodo = (post: Todo) => {
    const index = this.todos().findIndex(todo => todo.id == post.id);
    if (index == -1) {
      this.todos.set([post, ...this.todos()]);
      return;
    }
    this.todos.mutate(todos => (todos[index] = post));
  };
}


// AddProduct(_product: SalesProduct) {
//   this.productlist.mutate(previous => previous.push(_product))
// }

// UpdateProduct(_product: SalesProduct) {
//   let newarry = this.productlist().map(item => {
//     return item.slno === _product.slno ? _product : item
//   });
//   this.productlist.set(newarry);
// }

// RemoveProduct(slno: number) {
//   this.productlist.update(previous => previous.filter(item => item.slno !== slno));
// }

// GetProductbyCode(slno: number) {
//   this.productitem.set(this.productlist().find(item => item.slno === slno) as SalesProduct);
// }

// totalqty = computed(() => this.productlist().length);
// summarytotal = computed(() => this.productlist().reduce((prev: any, curr: SalesProduct) => {
//   return prev + curr.total
// }, 0))

// summarytax = computed(() => (this.summarytotal() * 7) / 100);
// summarynettotal = computed(() => (this.summarytotal() + this.summarytax()));
