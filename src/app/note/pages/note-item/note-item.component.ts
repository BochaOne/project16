import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyNote } from 'src/app/shared/interfaces/note.interface';
import { TypeNote } from 'src/app/shared/interfaces/type.interface';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {

  id: number | null = null;

  note!: MyNote;
  
  @Input() typeList!: TypeNote[];

  noteForm!: FormGroup;
  typeForm!: FormGroup;

  constructor(
    private noteService: NoteService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
      this.getTypes();
    })
  }

  async getData() {
    const controls = {
      noteTitle: [null, [Validators.required, Validators.maxLength(50)]],
      noteText: [null, [Validators.required, Validators.maxLength(200)]],
      noteType: [null, [Validators.required]],
      noteDate: [null],
      noteDateUpdate: [null],
    };

    this.noteForm = this.fb.group(controls);

    if(this.id) {
      try {
        this.note = await this.noteService.getNote(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.noteForm.patchValue(this.note);
    } else {
      this.noteForm.reset();
    }
  }

  async onAddNote() {
    if(this.id) {
      let now = new Date();
      this.noteForm.value["noteDateUpdate"] = now.toLocaleString();
      const note = this.noteForm.value;
      try {
        await this.noteService.putNote(this.id, note);
        this.router.navigate(['note']);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    } else {
      let now = new Date();
      this.noteForm.value["noteDate"] = now.toLocaleString();
      const note = this.noteForm.value;
      try {
        await this.noteService.postNote(note);
        this.router.navigate(['note']);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onDeleteNote() {
    try {
      await this.noteService.deleteNote(this.id!);
      this.router.navigate(['note']);
    } catch (error) {
      console.log(error);
    }
  }

  async getTypes() {
    try {
      this.typeList = await this.noteService.getTypes();
    } catch (err) {
      console.log(err);
    }
  }

}
