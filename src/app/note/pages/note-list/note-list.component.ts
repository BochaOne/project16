import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyNote } from 'src/app/shared/interfaces/note.interface';
import { TypeNote } from 'src/app/shared/interfaces/type.interface';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes!: MyNote[];

  typeList: TypeNote[] = [];

  modeEdit = false;

  @Output() deleteNote = new EventEmitter<number>();
  @Output() editNote = new EventEmitter<MyNote>();

  constructor(
    private noteService: NoteService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getNotes();
    this.getTypes();
  }

  async getNotes() {
    try {
      this.notes = (await this.noteService.getNotes()) || [];
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

  async getTypes() {
    try {
      this.typeList = await this.noteService.getTypes();
    } catch (err) {
      console.log(err);
    }
  }
  
  find(id: any) {
    return this.typeList.find((item)=> item.id == id)?.noteType;
  }
}
