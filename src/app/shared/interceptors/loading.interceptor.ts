import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
// Spinner service
import { SpinnerLoaderService } from '../services/loader/spinner-loader.service';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Get spinner service
  console.log('loadingInterceptor');
  // Set spinner state to true when request starts
  const spinnerLoaderService = inject(SpinnerLoaderService);
  spinnerLoaderService.setSpinnerState(true);
  // Set spinner state to false when request ends
  next(req).subscribe(() => spinnerLoaderService.setSpinnerState(false));
  return next(req);
};
