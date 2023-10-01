import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {
    userForm: FormGroup;
    user: object = {};

    constructor(private formBuilder: FormBuilder) {

        this.userForm = this.formBuilder.group({
            first_name: [],
            last_name: [],
            username: ['', Validators.required],
            age: [],
            country: [],
            city: [],
            genre: [],
            email: ['', [Validators.required, Validators.email]],
            psw1: ['', Validators.required],
            psw2: ['', Validators.required]
        })

    }


    disablePswInput(): boolean {
        if (this.userForm.controls['psw1'].touched && this.userForm.controls['psw1'].valid) {
            return true
        }
        return false
    }

    pswValidator(): boolean {
        if (
            (this.userForm.controls['psw2'].invalid ||
                this.userForm.value.psw1 != this.userForm.value.psw2)
            && this.userForm.controls['psw1'].touched) {
            return true
        }
        return false
    }

    activateSubmitBtn(): boolean {
        if (!this.pswValidator() && this.userForm.valid && this.validateAge()) {
            return false
        }
        return true
    }
    validateAge():boolean{
        let age = this.userForm.value.age

        if(age !== null){
            if (typeof age !== 'number') {
                return false
            }else if(age <= 0 || age >= 110){
                return false
            }
            if(typeof age === 'string'){
                return false
            }
        }
        return true
    }


    //userForm.controls['age'].invalid && userForm.controls['age'].touched
    onSubmit(): void {
        if (this.userForm.invalid) {
            alert('Invalid form');
            return;
        }

        const obj: Record<string, any> = {};
        const formValue = this.userForm.value;

        for (const [key, value] of Object.entries(formValue)) {
            if (value) {
                if (value && key !== 'first_name' && key !== 'last_name') {
                    if (key === 'psw1' || key === 'psw2') {
                        obj['psw'] = value;
                    } else {
                        obj[key] = value;
                    }
                } else {
                    if (obj['name']) {
                        obj['name'] += (" " + value)
                    } else {
                        obj['name'] = value
                    }
                }
            }
        }

        this.user = obj;
    }


}
