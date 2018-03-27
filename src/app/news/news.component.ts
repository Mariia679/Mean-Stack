import {Component, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: any;
  postForm: any = {};
  likes: number;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get('/comment').subscribe(data => {
      this.news = data;
    });
  }

  savePost(newsForm) {
    this.postForm.likes = 0;
    this.postForm.comments = [{}];
    // this.postForm.comments.likes = 0;
    // this.postForm.comments.comment = '';
    console.log(this.postForm);
    this.http.post('/comment', this.postForm)
      .subscribe(res => {
          this.ngOnInit();
          newsForm.reset();
        }, (err) => {
          console.log(err);
        }
      );
  }

  updatePost(post) {
    if (typeof post.likes === 'undefined') {
      post.likes = 0;
    }
    post.likes++;
    this.http.put('/comment/' + post._id, post)
      .subscribe(res => {
          this.ngOnInit();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
