import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DummyApiService } from 'src/app/services/dummy-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searching: boolean = false;
  userSearch = '';
  toggleActions: boolean = false;
  users: any;
  totalUsers: number = 0;
  addUserForm: FormGroup;

  constructor(private dummyApi: DummyApiService, private router: Router, private dialog: MatDialog, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getUsers()
    this.initAddUser()
  }

  initAddUser() {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],
    })
  }
  async getUsers() {
    await this.dummyApi.getUsers().subscribe((res: any) => {
      this.users = res.data;
      for (let index = 0; index < this.users.length; index++) {
        this.totalUsers++;

      }
    })
  }
  goToProfile(id: number) {
    this.router.navigate(['/employee', id])
  }


  searchToggle() {
    this.searching = !this.searching;
  }

  actions() {
    this.toggleActions = !this.toggleActions;
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  closeModal() {
    this.dialog.closeAll();
    this.resetForm()

  }
  saveUser() {
    if (this.addUserForm.valid) {
      Swal.fire({
        title: 'Do you want to save ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            let data = JSON.stringify(this.addUserForm.value);
            this.dummyApi.addUser(data).subscribe((resp: any) => {
              let response = resp.message
              Swal.fire(response, '', 'success')
            })
          } catch (error) {
            Swal.fire(error.message, 'Error!',)
          }
          this.closeModal()
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
          this.closeModal()

        }
      })
    }

  }
  resetForm() {
    this.addUserForm.patchValue({
      name: '',
      age: '',
      salary: '',
    })
  }
  deleteUser(id: number) {
    Swal.fire({
      title: 'Do you want to delete this user?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.dummyApi.deleteById(id).subscribe((resp) => {
            Swal.fire('Deleted!', '', 'success')
            this.getUsers()
          })
        } catch (error) {
          Swal.fire(error.message, 'Error!',)
        }


      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}