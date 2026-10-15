import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback.component';
import { provideRouter, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { provideLocationMocks } from '@angular/common/testing';
//import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'home', component: HomeComponent }]),
        provideLocationMocks(),
      ],

      imports: [FeedbackComponent, BrowserAnimationsModule, HomeComponent],
      /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]*/
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Tarkistaa että cancel toiminto palauttaa "home" näkymään. Testi ok
  it('should go home', () => {
    component.cancel();
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  //Tarkistaa että puhelinnumero on vähintään 10 merkkiä pitkä. Testi ok
  it('should mark phone field as invalid when input is less than 10 characters', () => {
    const ctrl = component.fbForm.get('phone');
    ctrl?.setValue('12345');

    expect(ctrl?.hasError('minlength')).toBeTruthy();
  });

  //Tarkistaa että puhelinnumero ei voi olla pidempi kuin 15 merkkiä. Testi ok
  it('should mark phone field as invalid when input is more than 15 characters', () => {
    const ctrl = component.fbForm.get('phone');
    ctrl?.setValue('1234512345123456');

    expect(ctrl?.hasError('maxlength')).toBeTruthy();
  });

  //Tarkistaa että nimi on vähintään 2 merkkiä pitkä. Testi ok
  it('should check name min length', () => {
    const ctrl = component.fbForm.get('name');
    ctrl?.setValue('L');

    expect(ctrl?.hasError('minlength')).toBeTruthy();
  });

  //Tarkistaa että nimi ei sisällä validointisääntöjen vastaisia merkkejä. Testi ok
  it('should check the name for invalid characters', () => {
    const ctrl = component.fbForm.get('name');
    ctrl?.setValue('Aape123');

    expect(ctrl?.hasError('pattern')).toBeTruthy();
  });

});
