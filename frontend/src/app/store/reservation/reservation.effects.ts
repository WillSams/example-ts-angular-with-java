import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ReservationActions from './reservation.actions';
import {
  GET_ALL_RESERVATIONS,
  GET_ALL_ROOMS,
  ReservationResult,
  RoomResult,
} from '../../graphql/queries';
import {
  CREATE_RESERVATION,
  DELETE_RESERVATION,
} from '../../graphql/mutations';
import { selectPendingDeleteId } from './reservation.selectors';
import { AppState } from '../app.state';

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

const GRAPHQL_URL = '/graphql';

@Injectable()
export class ReservationEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
  ) {}

  loadReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadReservations),
      switchMap(() =>
        this.http
          .post<
            GraphQLResponse<{ getAllReservations: ReservationResult }>
          >(GRAPHQL_URL, { query: GET_ALL_RESERVATIONS })
          .pipe(
            map((response) => {
              const result = response.data.getAllReservations;
              if (result.success) {
                return ReservationActions.loadReservationsSuccess({
                  reservations: result.reservations ?? [],
                });
              }
              return ReservationActions.loadReservationsFailure({
                error: result.errors?.[0] ?? 'Unknown error',
              });
            }),
            catchError((error) =>
              of(
                ReservationActions.loadReservationsFailure({
                  error: error.message ?? 'Network error',
                }),
              ),
            ),
          ),
      ),
    ),
  );

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadRooms),
      switchMap(() =>
        this.http
          .post<GraphQLResponse<{ getAllRooms: RoomResult }>>(GRAPHQL_URL, {
            query: GET_ALL_ROOMS,
          })
          .pipe(
            map((response) => {
              const result = response.data.getAllRooms;
              if (result.success) {
                return ReservationActions.loadRoomsSuccess({
                  rooms: result.rooms ?? [],
                });
              }
              return ReservationActions.loadRoomsFailure({
                error: result.errors?.[0] ?? 'Unknown error',
              });
            }),
            catchError((error) =>
              of(
                ReservationActions.loadRoomsFailure({
                  error: error.message ?? 'Network error',
                }),
              ),
            ),
          ),
      ),
    ),
  );

  createReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.createReservation),
      mergeMap((action) =>
        this.http
          .post<GraphQLResponse<{ createReservation: ReservationResult }>>(
            GRAPHQL_URL,
            {
              query: CREATE_RESERVATION,
              variables: {
                input: {
                  room_id: action.room_id,
                  checkin_date: action.checkin_date,
                  checkout_date: action.checkout_date,
                },
              },
            },
          )
          .pipe(
            map((response) => {
              const result = response.data.createReservation;
              if (result.success) {
                return ReservationActions.createReservationSuccess({
                  reservations: result.reservations ?? [],
                });
              }
              return ReservationActions.createReservationFailure({
                error: result.errors?.[0] ?? 'Failed to create reservation',
              });
            }),
            catchError((error) =>
              of(
                ReservationActions.createReservationFailure({
                  error: error.message ?? 'Network error',
                }),
              ),
            ),
          ),
      ),
    ),
  );

  confirmDeletion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.confirmDeletion),
      withLatestFrom(this.store.select(selectPendingDeleteId)),
      mergeMap(([, pendingDeleteId]) => {
        if (pendingDeleteId === null) {
          return of(
            ReservationActions.deleteReservationFailure({
              error: 'No reservation selected for deletion',
            }),
          );
        }
        return of(
          ReservationActions.deleteReservation({
            reservationId: pendingDeleteId,
          }),
        );
      }),
    ),
  );

  deleteReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.deleteReservation),
      mergeMap((action) =>
        this.http
          .post<GraphQLResponse<{ deleteReservation: ReservationResult }>>(
            GRAPHQL_URL,
            {
              query: DELETE_RESERVATION,
              variables: { reservationId: action.reservationId },
            },
          )
          .pipe(
            map((response) => {
              const result = response.data.deleteReservation;
              if (result.success) {
                return ReservationActions.deleteReservationSuccess({
                  reservations: result.reservations ?? [],
                });
              }
              return ReservationActions.deleteReservationFailure({
                error: result.errors?.[0] ?? 'Failed to delete reservation',
              });
            }),
            catchError((error) =>
              of(
                ReservationActions.deleteReservationFailure({
                  error: error.message ?? 'Network error',
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
