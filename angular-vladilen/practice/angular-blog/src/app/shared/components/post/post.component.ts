import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../../admin/shared/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('post') post!: IPost;

  constructor() { }

  ngOnInit(): void {
  }

}
