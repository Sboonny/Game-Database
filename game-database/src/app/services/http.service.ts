import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { stringify } from 'querystring';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string,
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return  http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params
    }
    )
  }
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest =  http.get(`${env.BASE_URL}/games/${id}`)
    const gameTrailersRequest =  http.get(`${env.BASE_URL}/games/${id}/movies`)
    const gameScreenshotsRequest =  http.get(`${env.BASE_URL}/games/${id}/screenshots`)

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest
    }).pipe(
      map((resp: any) => {
        return{
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results
        }
      })
      )
  }

}

