import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleService} from 'src/app/services/people.service';
import {Observable, map, of, startWith} from 'rxjs';
import {Person} from 'src/app/Types/Person';
import {Results} from 'src/app/Types/Results';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [PeopleService],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  people$: Observable<Person[]>;
  options: Person[];
  filteredPeople$: Observable<Person[]>;
  formGroup: FormGroup;
  constructor(
    private peopleService: PeopleService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.people$ = this.peopleService.getPeople().pipe(
      map((res: Results) => {
        this.options = res.results;
        this.initForm();
        return res.results;
      }),
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
        this.filteredPeople$ = of(
          this.options.filter(el =>
            `${el.name.first} ${el.name.last}`.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );
      });
  }
}
