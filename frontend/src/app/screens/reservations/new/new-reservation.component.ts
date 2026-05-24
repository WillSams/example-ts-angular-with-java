import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { AppState } from '../../../store/app.state';
import { Room } from '../../../graphql/queries';
import * as ReservationActions from '../../../store/reservation/reservation.actions';
import {
  selectRooms,
  selectLoading,
  selectAlert,
} from '../../../store/reservation/reservation.selectors';

@Component({
  selector: 'app-new-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-reservation.component.html',
})
export class NewReservationComponent implements OnInit {
  rooms$: Observable<Room[]>;
  loading$: Observable<boolean>;
  alert$: Observable<{ message: string; alertType: string } | null>;

  tomorrow: string;

  formData = {
    room_id: '',
    checkin_date: '',
    checkout_date: '',
  };

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
  ) {
    this.rooms$ = this.store.select(selectRooms);
    this.loading$ = this.store.select(selectLoading);
    this.alert$ = this.store.select(selectAlert);

    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.tomorrow = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.store.dispatch(ReservationActions.loadRooms());
  }

  onSubmit(): void {
    if (
      !this.formData.room_id ||
      !this.formData.checkin_date ||
      !this.formData.checkout_date
    ) {
      return;
    }

    this.store.dispatch(
      ReservationActions.createReservation({
        room_id: this.formData.room_id,
        checkin_date: this.formData.checkin_date,
        checkout_date: this.formData.checkout_date,
      }),
    );

    this.actions$
      .pipe(ofType(ReservationActions.createReservationSuccess), take(1))
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  dismissAlert(): void {
    this.store.dispatch(ReservationActions.clearAlert());
  }
}
