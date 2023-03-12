import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

constructor(private http: HttpClient) { }

getAll():Observable<Character[]>{
  return this.http.get<Character[]>('https://rickandmortyapi.com/api/character').pipe(map((data:any) => data.results))
}

getAllSorted():Observable<Character[]>{
  return this.http.get<Character[]>('https://rickandmortyapi.com/api/character')
                  .pipe(map((data:any) => data.results
                  .sort(function(a:any, b:any){
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (a.name > b.name) {
                      return 1;
                    }
                    return 0;
                  })))
}

search(q: string){

  if(!q){
    q = '';
  } else {
    q = q.toLowerCase().trim();
  }

  return this.getAllSorted().pipe(
    map((chars: Character[]) => {
      return chars.filter((char: Character) => char.name.toLowerCase().includes(q))})
  )
}

getChar(id:number){
  return this.getAll().pipe(
    map((data:Character[]) => data.find((c: Character) => c.id === id))
  )
}

}

export class Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: any
  image: string 

  constructor(obj: Character) {
    this.id = obj?.id,
    this.name = obj?.name,
    this.status = obj?.status,  
    this.species = obj?.species,
    this.type = obj?.type,
    this.gender = obj?.gender,
    this.origin = obj?.origin.name,
    this.image = obj?.image
  }
}
