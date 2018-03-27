import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {

  post: any = {};
  commentsIsEmpty: boolean;
  commentsForm: any = {};
  commentIsEmpty: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.getPostDetail(this.route.snapshot.params['id']);
  }

  getPostDetail(id) {
    this.http.get('/comment/' + id).subscribe(data => {
      const dataInner: any = data;

      if (dataInner.comments.length === 1) {
        this.commentsIsEmpty = true;
      } else {
        this.commentsIsEmpty = false;
      }
      for (let i = 0; i < dataInner.comments.length; i++) {
        if (typeof dataInner.comments[i].likes === 'undefined') {
          dataInner.comments[i].commentIsEmpty = true;
        } else {
          dataInner.comments[i].commentIsEmpty = false;
        }
      }

      const options = {
        weekday: 'long', year: 'numeric', month: 'short',
        day: 'numeric'
      };
      dataInner.updated_date = new Date(dataInner.updated_date).toLocaleDateString('en-US', options);
      this.post = dataInner;
    });
  }

  saveComment(commentForm) {
    const size = this.post.comments.length;
    this.post.comments[size - 1].likes = 0;
    this.post.comments[size - 1].comment = this.commentsForm.comment;
    this.post.comments[size] = {};

    this.http.put('/comment/' + this.post._id, this.post)
      .subscribe(res => {
          this.ngOnInit();
          commentForm.reset();
        }, (err) => {
          console.log(err);
        }
      );
  }

  updatePost(id) {
    this.post.comments[id].likes++;
    this.http.put('/comment/' + this.post._id, this.post)
      .subscribe(res => {
          this.ngOnInit();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
