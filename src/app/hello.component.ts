import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'hello',
  template: `<form [formGroup]="specimenFields" (ngSubmit)="addSpecs();showSpecForm=false">
        <div formArrayName="specimenControls">
          <div *ngFor="let specimen of specimens; let i=index" style="margin-bottom:10px">
            <label class="form-label">{{specimen.label}}</label> 
            <input matInput class="form-textbox" type="text" [formControlName]="i" maxlength="2" size="2" value="0"/>
            <button style="margin-left:15px;" (click)="decNumber(this.value)" color="primary">-</button>
            <button style="margin-left:10px;" (click)="incNumber(this.value)" color="primary">+</button>
          </div>
        </div>
        <button type="submit" color="primary">Submit</button>
      </form>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent {
  @Input() name: string;
  specimenControls: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.addSpecimens();
    console.log(this.specimenFields)
  }

  specimens = [
    { label: "SST: ", name: "sst" },
    { label: "LAV: ", name: "lav" },
    { label: "BLUE: ", name: "blue" }
  ];

  specimenFields: FormGroup = this.formBuilder.group({
    specimenControls: this.formBuilder.array([
    ])
  });

  addNewFormControl(specimen) {
    const control = <FormArray>this.specimenFields.controls['specimenControls'];
    control.push(this.formBuilder.control(specimen.name));
    // OR
    // control.push(new FormControl(specimen.name));
  }

  addSpecimens() {
    for (let specimen of this.specimens) {
      console.log(specimen)
      this.addNewFormControl(specimen);
    }
  }
}
