import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SizeService } from '../services/size.service';

@Component({
  selector: 'app-update-size',
  templateUrl: './update-size.component.html',
  styleUrls: ['./update-size.component.css']
})
export class UpdateSizeComponent implements OnInit {

  id: String;
  sizeName: String;

  constructor(private router: Router, private sizeService: SizeService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      id: String;
      sizeName: String;
    }

    this.id = state.id;
    this.sizeName = state.sizeName;
  }

  ngOnInit(): void {
  }

  onSizeUpdate(id, sizeName) {
    const updateSizeParams = {
      id: id,
      sizeName: sizeName
    };

    this.sizeService.updateSize(updateSizeParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.router.navigate(["/home/size"]);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })
  }

}
