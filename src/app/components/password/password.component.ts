import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {StrengthPasswordValidator} from "../../shared/strength-password-validator";
import {ColorsEnum} from '../../shared/colors-Enum';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements OnInit {
  password!: FormControl
  easy: ColorsEnum = ColorsEnum.Grey;
  medium: ColorsEnum = ColorsEnum.Grey;
  strong: ColorsEnum = ColorsEnum.Grey;

  ngOnInit(): void {
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      StrengthPasswordValidator()
    ])
    this.password.valueChanges.subscribe(() => {
      this.validate()
    })
  }

  validate() {
    if (this.password.hasError('required')) {
      this.setPasswordsStrengthColors(ColorsEnum.Grey)
    } else if (this.password.hasError('minlength')) {
      this.setPasswordsStrengthColors(ColorsEnum.Red)
    } else if (this.password.hasError('easyStrength')) {
      this.setEasyStrengthColors()
    } else if (this.password.hasError('mediumStrength')) {
      this.setMediumStrengthColors()
    } else if (this.password.valid) {
      this.setPasswordsStrengthColors(ColorsEnum.Green)
    }
  }

  setPasswordsStrengthColors(color: ColorsEnum) {
    this.easy = color;
    this.medium = color;
    this.strong = color;
  }

  setEasyStrengthColors() {
    this.easy = ColorsEnum.Red;
    this.medium = ColorsEnum.Grey;
    this.strong = ColorsEnum.Grey;
  }

  setMediumStrengthColors() {
    this.easy = ColorsEnum.Yellow;
    this.medium = ColorsEnum.Yellow;
    this.strong = ColorsEnum.Grey;
  }
}
