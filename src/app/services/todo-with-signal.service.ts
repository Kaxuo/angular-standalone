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
