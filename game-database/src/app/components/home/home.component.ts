import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string | undefined;
  public games!: Array<Game>;
  private routeSub: Subscription = new Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
     activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
         searchGames('metacrit', params['game-search'])
      } else {
         searchGames('metacrit')
      }
    })
  }

  searchGames(sort: string, search?: string):void {
    gameSub =  httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
         games = gameList.results
        console.log(gameList)
      })
  }

  openGameDetails(id: string): void {
     router.navigate(['details', id])
  }

  ngOnDestory(): void {
    if( gameSub) {
       gameSub.unsubscribe();
    }

    if ( routeSub) {
       routeSub.unsubscribe()
    }
  }
}
