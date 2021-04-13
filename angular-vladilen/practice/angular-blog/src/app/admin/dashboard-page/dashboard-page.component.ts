import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {IPost} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  pSUB!: Subscription;
  dSUB!: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.pSUB = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSUB) {
      this.pSUB.unsubscribe();
    }

    if (this.dSUB) {
      this.dSUB.unsubscribe();
    }
  }

  remove(id?: string): void {
    if (id) {
      this.dSUB = this.postsService.remove(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.alert.warning('Поста был удлён');
      });
    }

  }
}
