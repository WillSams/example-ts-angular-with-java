import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Reservation } from '../../graphql/queries';
import * as ReservationActions from '../../store/reservation/reservation.actions';
import {
  selectReservations,
  selectLoading,
  selectAlert,
  selectConfirmModalOpen,
} from '../../store/reservation/reservation.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  reservations$: Observable<Reservation[]>;
  loading$: Observable<boolean>;
  alert$: Observable<{ message: string; alertType: string } | null>;
  confirmModalOpen$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.reservations$ = this.store.select(selectReservations);
    this.loading$ = this.store.select(selectLoading);
    this.alert$ = this.store.select(selectAlert);
    this.confirmModalOpen$ = this.store.select(selectConfirmModalOpen);
  }

  ngOnInit(): void {
    this.store.dispatch(ReservationActions.loadReservations());
  }

  openCancelModal(reservationId: number): void {
    this.store.dispatch(
      ReservationActions.openConfirmationModal({ reservationId }),
    );
  }

  confirmDeletion(): void {
    this.store.dispatch(ReservationActions.confirmDeletion());
  }

  cancelDeletion(): void {
    this.store.dispatch(ReservationActions.cancelDeletion());
  }

  dismissAlert(): void {
    this.store.dispatch(ReservationActions.clearAlert());
  }
}
