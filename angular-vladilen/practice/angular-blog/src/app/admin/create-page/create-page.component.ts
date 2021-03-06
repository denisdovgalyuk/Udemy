import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPost} from '../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private postService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
        title: new FormControl(null, Validators.required),
        text: new FormControl(null, Validators.required),
        author: new FormControl(null, Validators.required)
      }
    );
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: IPost = {...this.form.value, date: new Date()};

    this.postService.create(post).subscribe(() => {
      this.form.reset();
      this.alert.success('Пост был создан');
    });

    console.log(post);
  }

}
