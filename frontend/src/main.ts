import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { routes } from './app/app.routes';
import { reservationReducer } from './app/store/reservation/reservation.reducer';
import { ReservationEffects } from './app/store/reservation/reservation.effects';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { AuthService } from './app/core/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ reservation: reservationReducer }),
    provideEffects([ReservationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService,
  ],
  // eslint-disable-next-line no-console
}).catch((err) => console.error(err));
