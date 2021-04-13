import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {IPost} from '../admin/shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<IPost>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postServices: PostsService
  ) { }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this.postServices.getById(params.id);
        })
      );
  }

}
