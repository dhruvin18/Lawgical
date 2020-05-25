import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { formatDate } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  query = false;
  serverErrorMessages: string;
  functionDebug: string;
  functionDebug1: string;
  case;
  svmclass;
  nbclass;
  rfclass;
  lrclass;
  knnclass;
  classerror;
  files;
  lr = 'Logistic Regression';
  nb = 'Naive Bayes';
  rf = 'Random Forest';
  svm = 'SVM';
  knn = 'k Nearest Neighbour';
  name = 'http://localhost:5000/download';
  filename = 'AmrishTrivediAliasNikkiVStateOfUP.txt';
  // keywords: string[];
  keywords;
  confidence: number[];
  extraction;
  constructor(private userService: UserService, private router: Router) { }

  model = {
    data: '',
  };

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp];
      },
      err => {}
    );
  }


  onSubmit(form: NgForm) {
    this.query = true;
    const formdata = form.value;
    // this.userService.extractKeywords(form.value).subscribe(
    //   res => {
    //     // this.functionDebug = JSON.stringify(res[0]);
    //     const text = 'text';
    //     const temp = 'extractions';
    //     const temp1 = 'parsed_value';
    //     this.keywords = res[0][temp];
    //     // this.case = res[0][text];
    //   },
    //   err => {
    //     this.functionDebug = err.errors;
    //   }
    // );
    this.userService.get_files(form.value).subscribe(
      res => {
        const filenames = 'filenames';
        this.files = res[filenames];
      }
    );
    this.userService.predict_label(form.value).subscribe(
      res => {
        const data = 'case';
        this.case = res[data];
        this.lrclass = res[this.lr];
        this.nbclass = res[this.nb];
        this.rfclass = res[this.rf];
        this.knnclass = res[this.knn];
        this.svmclass = res[this.svm];
        this.query = false;
      },
      err => {
        this.classerror = err.errors;
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }
}
