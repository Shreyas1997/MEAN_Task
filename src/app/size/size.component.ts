import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SizeService } from '../services/size.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  sizeName: String;
  allSizes: String;

  constructor(private router: Router, private sizeService: SizeService) {
    this.sizeService.listen().subscribe((data: any) => {
      this.loadSizes();
    });
  }

  ngOnInit(): void {
    this.loadSizes();
  }

  loadSizes(){
    this.sizeService.getAllSizes().subscribe((data: any) => {
      if (data.result === 1) {
        this.allSizes = data.data;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    });
  }

  onSubmitNewSize(){
    const newSize = {
      sizeName: this.sizeName
    };

    this.sizeService.addNewSize(newSize).subscribe((data: any) => {
      if (data.result === 1) {
        this.sizeName = "";

        alert("New Size Added");
        this.loadSizes();
      } else if (data.result === 0) {
        alert("Something went wrong");
      }
    })
  }

  updateSize(id, sizeName){

    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        sizeName: sizeName,
      }
    }
    this.router.navigate(["/home/size/editSize"], navigationExtras);
  }

  deleteSize(id){
    const deleteSizeParams = {
      id: id
    }

    var confirmation = confirm("Do you want to delete this size ?");

    if (confirmation == true) {
      this.sizeService.deleteSize(deleteSizeParams).subscribe((data: any) => {
        if (data.result === 1) {
          alert('Size deleted');
          this.loadSizes();
        } else if (data.result === 0) {
          alert('Something went wrong');
        }
      });
    } else {
      alert("Deletion Cancelled");
    }
  }
}
