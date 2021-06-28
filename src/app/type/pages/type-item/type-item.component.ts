import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeNote } from 'src/app/shared/interfaces/type.interface';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css']
})
export class TypeItemComponent implements OnInit {

  id: number | null = null;

  type!: TypeNote;

  typeForm!: FormGroup;

  constructor(
    private typeService: NoteService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
    })
  }

  async getData() {
    const controls = {
      noteType: [null, [Validators.required, Validators.maxLength(50)]],
      dateCreateType: [null],
      dateEditType: [null],
    };

    this.typeForm = this.fb.group(controls);

    if(this.id) {
      try {
        this.type = await this.typeService.getType(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.typeForm.patchValue(this.type);
    } else {
      this.typeForm.reset();
    }
  }

  async onAddType() {
    if(this.id) {
      let now = new Date();
      this.typeForm.value["dateEditType"] = now.toLocaleString();
      const type = this.typeForm.value;
      try {
        await this.typeService.putType(this.id, type);
        this.router.navigate(['type']);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    } else {
      let now = new Date();
      this.typeForm.value["dateCreateType"] = now.toLocaleString();
      const type = this.typeForm.value;
      try {
        await this.typeService.postType(type);
        this.router.navigate(['type']);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onDeleteType() {
    try {
      await this.typeService.deleteType(this.id!);
      this.router.navigate(['type']);
    } catch (error) {
      console.log(error);
    }
  }

}
