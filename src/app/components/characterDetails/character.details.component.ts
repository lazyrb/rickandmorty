import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, SearchService } from '../search/search.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.details.component.html',
  styleUrls: ['./character.details.component.scss'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  character!: Character;
  sub!: Subscription;
  searchQuery!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((param) => {
      if (!param['query']) {
        this.searchQuery = '';
      } else {
        this.searchQuery = param['query'];
      }
      const id = +param['id'];

      this.searchService.getCharacter(id).subscribe((char) => {
        if (char) this.character = char;
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  back() {
    if (this.searchQuery) {
      this.router.navigate(['/search', { query: this.searchQuery }]);
    } else {
      this.router.navigate(['/search']);
    }
  }
}
