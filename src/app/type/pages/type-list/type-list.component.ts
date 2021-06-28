import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeNote } from 'src/app/shared/interfaces/type.interface';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  types!: TypeNote[];

  constructor(
    private typeService: NoteService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTypes();
  }

  async getTypes() {
    try {
      this.types = (await this.typeService.getTypes()) || [];
    } catch (err) {
      console.log(err);
    }
  }

  linkToItem(id?: number) {
    if(id) {
      this.router.navigate([this.router.url, "item", id])
    } else {
      this.router.navigate([this.router.url, "item"])
    }
  }
}
