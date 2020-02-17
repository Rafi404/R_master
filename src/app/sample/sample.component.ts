import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LibraryService } from 'app/services/library.service';
export interface User {
  author_name: string;
  id: number;
}

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})

export class SampleComponent implements OnInit {

  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;
  constructor(private library: LibraryService) {}
  ngOnInit() {
    this.library.getAuthor().subscribe(res => {
      this.options = res.authors;
      console.log(this.options);
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.author_name),
        map(author_name => author_name ? this._filter(author_name) : this.options.slice())
      );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.author_name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.author_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
