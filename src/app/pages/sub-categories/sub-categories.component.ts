import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
    selector: 'app-sub-categories',
    templateUrl: './sub-categories.component.html',
    styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

    name = '';
    categoryName: '';
    data: any;
    subCategories: any[];
    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
        this.data = dataService.getData();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let routeToHome = false;
            if (params && params.categoryName && params.name) {
                this.categoryName = params.categoryName;
                this.name = params.name;
                const branches = [].concat.apply([], this.data.locations.map(x => (x.branches)));
                const categories = [].concat.apply([], branches.map(x => (x.categories)));
                const selectedCategories = categories.find(x => x.name === this.categoryName);
                if (selectedCategories) {
                    this.subCategories = selectedCategories.subcategories;
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
