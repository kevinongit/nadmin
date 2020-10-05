import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <nb-user size="large"
        [picture]="pic"
         onlyPicture>
      </nb-user>
`
})
export class PictureRenderComponent implements ViewCell, OnInit {

    pic: string;

    @Input() value: string;
    @Input() rowData: any;

    ngOnInit() {
        this.pic = this.value;
    }

}