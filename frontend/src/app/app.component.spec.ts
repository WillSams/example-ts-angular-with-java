import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const mockAuthService = {
  login: () =>
    of({ access_token: 'test-token', token_type: 'bearer', expires_in: 3600 }),
  getToken: () => 'test-token',
  clearToken: () => undefined,
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call login on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const loginSpy = spyOn(mockAuthService, 'login').and.callThrough();
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalled();
  });
});
