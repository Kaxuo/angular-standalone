import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosWithSignalService} from 'src/app/services/todo-with-signal.service';
import {Observable, Subject, take, takeUntil} from 'rxjs';
import {Todo} from 'src/app/Types/Todo';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [TodosWithSignalService],
})
export class SignalComponent {
  private destroy$ = new Subject<void>();
  todoService = inject(TodosWithSignalService);
  todos$: Observable<Todo[]>;

  ngOnInit() {
    this.todos$ = this.todoService.getPosts();
  }

  get todos() {
    return this.todoService.todos;
  }

  deleteTodo(todoId: number) {
    this.todoService.deletePost(todoId).pipe(take(1)).subscribe();
  }

  addItem() {
    const item: Todo = {
      id: Math.random() * 100,
      userId: Math.random() * 100,
      title: 'New One has been created',
      completed: false,
    };
    this.todoService.createPost(item).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
