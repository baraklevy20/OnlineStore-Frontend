import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { FillInfoDialogComponent } from './fillInfoDialog/fillInfoDialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

export interface UserInfo {
  username: string;
  address: string;
}

export interface GetUserInfoCaller {
  onUserInfoFilled(): any;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userInfo: UserInfo;
  public userInfoObservable: Subject<any> = new Subject<any>();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    // Load user info from the local storage
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")) as UserInfo

    if (!this.userInfo) {
      this.userInfo = {} as UserInfo
    }
    
    this.userInfoObservable.next(this.userInfo);
  }

  hasInfo() {
    return this.userInfo.username !== undefined;
  }

  showFillInfoDialog(caller: GetUserInfoCaller) {
    const dialogRef = this.dialog.open(FillInfoDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // If the user entered their details, we register them on the backend      
      if (result) {
        this.userInfo = result;
        this.userInfoObservable.next(this.userInfo);
        this.registerUser(caller);
      }
    });
  }

  registerUser(caller: GetUserInfoCaller) {
    // Save the user on the backend
    this.http.post(`${environment.api_base_url}/users`, this.userInfo).subscribe(result => {
      // Save the username in the local storage
      localStorage.setItem("userInfo", JSON.stringify(result));

      // Callback on the caller
      caller.onUserInfoFilled();
    });
  }
}
