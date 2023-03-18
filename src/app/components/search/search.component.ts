import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchInput: string = '';
  sub!: Subscription;
  characters: Character[] = [];

  constructor(
    private searchService: SearchService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.router.params.subscribe((params) => {
      if (params['query']) {
        this.searchInput = decodeURIComponent(params['query']);
        this.search();
      } else {
        this.searchService
          .getAllSorted()
          .subscribe((chars: Character[]) => (this.characters = chars));
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async search() {
    this.searchService
      .search(this.searchInput)
      .subscribe((char: Character[]) => (this.characters = char));
  }
}
