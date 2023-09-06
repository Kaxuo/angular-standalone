import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from 'src/app/services/people.service';
import { Observable, map } from 'rxjs';
import { Person } from 'src/app/Models/Person';
import { Results } from 'src/app/Models/Results';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  providers: [PeopleService],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  people$: Observable<Person[]>;
  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.people$ = this.peopleService
      .getPeople()
      .pipe(map((res: Results) => res.results));
  }
}
