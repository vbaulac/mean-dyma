import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private unsplash = new Unsplash({
    applicationId: "9507a08bb8ef08e7c65799b7cbe4fa2b70548d3aed3ca9509ff0d968a2f30d9b",
    secret: "f360d57ae6d29ff16f3a7e8659189b023001c69f8072895250c04aa33cf8ea56",
    callbackUrl: "http://127.0.0.1:3000/unsplash"
  });

  constructor() { }

  public getPictures(filter: string) {
    return from(this.unsplash.search.photos(filter, 0).then(res => res.json())).pipe(
      map( (res: any) => {
        console.log (res.results);
        return res.results.map(r => ({ url: r.urls.small }));
      })
    )
  }
}
