import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DummyApiService } from 'src/app/services/dummy-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id: any;
  age: 0;
  updateUserForm: FormGroup;
  constructor(private dummyApi: DummyApiService, private router: Router, private dialog: MatDialog, private fb: FormBuilder) { }
  employee: any;
  async ngOnInit() {
    this.id = this.router.url.split('/').pop();
    await this.getEmployeeById(this.id);
  }

  getEmployeeById(id: number) {
    this.dummyApi.getUserById(id).subscribe((res: any) => {
      this.employee = res.data;
      this.age = this.employee.employee_age || 0;

    })
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
    this.initUpdateUser();

  }
  closeModal() {
    this.dialog.closeAll();
  }
  initUpdateUser() {
    this.updateUserForm = this.fb.group({
      name: [this.employee.employee_name, Validators.required],
      salary: [this.employee.employee_age, Validators.required],
      age: [this.employee.employee_salary, Validators.required],
    })
    // this.patchForm()

  }
  updateUser() {
    if (this.updateUserForm.valid) {
      Swal.fire({
        title: 'Do you want to update ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Update',
        denyButtonText: `Don't update`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = JSON.stringify(this.updateUserForm.value);

          try {
            this.dummyApi.updateUserById(this.id, data).subscribe((resp: any) => {
              let response = resp.message;
              Swal.fire('Updated!', response, 'success')
            })
            Swal.fire('Saved!', '', 'success')
            this.closeModal()
          } catch (error) {
            Swal.fire(error, 'error')
          }

        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
          this.closeModal()

        }
      })
    }
  }
}
