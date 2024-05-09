import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoService} from 'src/app/services/todo.service';
import {Observable, Subject, of, shareReplay, startWith, take, takeUntil, tap} from 'rxjs';
import {Todo} from 'src/app/Types/Todo';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TodoService],
})
export class SignalComponent {
  todoService = inject(TodoService);
  fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  formGroup: FormGroup;
  todos$: Observable<Todo[]>;
  filteredTodos: Todo[];

  ngOnInit() {
    this.todos$ = this.todoService.getPosts().pipe(
      tap(() => this.initForm()),
      shareReplay(),
    );
  }

  initForm() {
    this.formGroup = this.fb.group({
      search: [''],
    });
    this.subFilters();
  }

  subFilters() {
    this.formGroup
      .get('search')
      ?.valueChanges.pipe(startWith(''))
      .subscribe((searchTerm: string) => {
        this.filteredTodos = this.todos().filter(x => x.title.includes(searchTerm));
      });
  }

  get todos() {
    return this.todoService.todos;
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

  updateFirstItem() {
    const item: Todo = {
      id: 1,
      userId: Math.random() * 100,
      title: 'First item updated',
      completed: false,
    };
    this.todoService.updatePost(item).pipe(takeUntil(this.destroy$)).subscribe();
  }

  deleteTodo(todoId: number) {
    this.todoService.deletePost(todoId).pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
