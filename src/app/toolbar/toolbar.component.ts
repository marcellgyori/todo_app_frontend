import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../auth/register-login.component';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public isCurrentUser: boolean;
  constructor(public dialog: MatDialog) {
    this.isCurrentUser = localStorage.getItem('currentUser') ? true : false;
  }

  ngOnInit(): void {}

  openDialog(isRegister: boolean): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      width: 'max(500px)',
      data: { isRegister },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isCurrentUser = localStorage.getItem('currentUser') ? true : false;
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isCurrentUser = false;
    location.reload();
  }
}
