import { Component, inject, input, OnInit } from '@angular/core';
import { IMAGE_API_ROUTES } from '../../constants/api-routes';
import { HttpService } from '../../services/http.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-img-thumbnail',
  imports: [],
  templateUrl: './img-thumbnail.component.html',
  styleUrl: './img-thumbnail.component.scss',
})
export class ImgThumbnailComponent implements OnInit {
  private httpService = inject(HttpService);

  label = input<string>();
  url = input<string>('');
  isLoading!: boolean;
  imgSrc!: string;

  ngOnInit(): void {
    this.fetchSignedUrl(this.url());
  }

  fetchSignedUrl(url: string) {
    this.isLoading = true;
    return this.httpService
      .get(IMAGE_API_ROUTES.GET_SIGNED_URL(url))
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res: any) => {
          this.imgSrc = res;
        },
      });
  }
}
