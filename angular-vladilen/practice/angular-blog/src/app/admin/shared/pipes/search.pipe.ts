import {Pipe, PipeTransform} from '@angular/core';
import {IPost} from '../interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(posts: IPost[], search = ''): IPost[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
  }

}
