import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  imports: [CommonModule, NzCardModule, NzGridModule, NzBreadCrumbModule],
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  name = '';
  categoryName: any = '';
  data: any;
  subCategories: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.data = dataService.getData();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      let routeToHome = false;
      if (params && params.categoryName && params.name) {
        this.categoryName = params.categoryName;
        this.name = params.name;
        const branches = [].concat.apply([], this.data.locations.map((x: any) => (x.branches)));
        const categories = [].concat.apply([], branches.map((x: any) => (x.categories)));
        const selectedCategories: any = categories.find((x: any) => x.name === this.categoryName);
        if (selectedCategories) {
          this.subCategories = selectedCategories.subcategories.map((x: any) => ({ ...x, isImageLoaded: false }));
        } else {
          routeToHome = true;
        }
      } else {
        routeToHome = true;
      }

      if (routeToHome) {
        this.router.navigate(['']);
      }
    });
  }
}
