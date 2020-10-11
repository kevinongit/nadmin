import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { UserTableService } from '../../../../@core/k-real/user-table.service'

@Component({
    selector: 'user-search',
    templateUrl: './user-search.component.html',
    styles: [
        `
            .from-control {
                margin-bottom: 15px;
            }
        `
    ]
})
export class UserSearchComponent implements OnInit {
    form: FormGroup;
    levels = [
        "Beginner",
        "Expert",
    ];
    @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
    searchText: string = '';

    constructor(
        private fb: FormBuilder,
        private userService: UserTableService,
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            jobTitle: new FormControl(''),
            level: new FormControl(''),
            ageFrom: new FormControl(''),
            ageTo: new FormControl(''),
        })
    }

    search(filters: any): void {
        Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key)
        console.log(`filters : ${JSON.stringify(filters)}`)
        this.groupFilters.emit(filters);
    }
}