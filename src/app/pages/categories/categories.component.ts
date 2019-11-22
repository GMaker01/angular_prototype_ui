import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    name = '';
    data: any;
    categories: any[];
    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
        this.data = dataService.getData();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let routeToHome = false;
            if (params && params.id && params.type) {
                if (params.type === 'branch') {
                    if (params.locationId) {
                        const location = this.data.locations.find(x => x.dealers_id === params.locationId);
                        if (location && location.branches && location.branches.length) {
                            const data = location.branches.find(x => x.branch_id === params.id);
                            this.name = data.name;
                            this.categories = data.categories;
                        } else {
                            routeToHome = true;
                        }
                    } else {
                        routeToHome = true;
                    }
                } else if (params.type === 'location') {
                    const location = this.data.locations.find(x => x.dealers_id === params.id);
                    this.name = location.name;
                    if (location && location.branches && location.branches.length) {
                        this.categories = [].concat.apply([], location.branches.map(x => (x.categories)));
                        // this.categories = data.categories;
                    } else {
                        routeToHome = true;
                    }
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

    goToSubCategories(categoryName: string) {
        this.router.navigate(['/sub-category'], { queryParams: { categoryName, name: this.name } });
    }

}
