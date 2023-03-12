import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Character, SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  //add type
  query: string = '';
  sub!: Subscription;
  searchResults: Character[] = [];

  constructor(private searchService: SearchService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      if(params['query']){
        this.query = decodeURIComponent(params['query']);
        this.search();
      } else {
        this.searchService.getAllSorted().subscribe((chars:Character[]) => this.searchResults = chars)
      }
    })

  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }

  async search(){
    this.searchService.search(this.query).subscribe((char: Character[]) => this.searchResults = char )
  }

}
