import { DataService  } from './../services/data.service';
import { Component , OnInit} from '@angular/core';
import { Book } from 'src/app/Model/book'
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  myForm: FormGroup;
  books:any;
  book = new Book();
  constructor(
    private DataService:DataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ){
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      // Add more form controls and validation rules as needed
    });
  }

  ngOnInit(): void{
    this.getBooksData()
  }

  getBooksData(){
    this.DataService.getBooks().subscribe(res =>{
      this.books = res
    })
  }

  createdata(){
    const formData = this.myForm.value;
    // console.log(this.myForm.controls['title'])
    this.DataService.addBook(formData).subscribe(res =>{
      this.myForm.reset();
      this.getBooksData()
          this.toastr.success('Record deleted successfully!', 'Success');
    })
  }

  updateValidity(controlName: string) {
    const control = this.myForm.get(controlName);
    console.log(control)
    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  deleteBook(id:any){
    console.log(id)
    this.DataService.deleteBook(id).subscribe((res :any)=>{
      this.toastr.error(res.message, 'Success');
      this.getBooksData()
    })
  }
}
