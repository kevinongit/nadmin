import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { UserMgmtService } from '../../../../@core/k-real/user-mgmt.service'

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
    roles = [
        "Basic",
        "Admin",
        "Super-Saiyan",
    ];
    @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
    searchText: string = '';

    constructor(
        private fb: FormBuilder,
        private userService: UserMgmtService,
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            userName: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            jobTitle: new FormControl(''),
            role: new FormControl(''),
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