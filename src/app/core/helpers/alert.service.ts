import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private toastr: ToastrService) { }

  /**
   * Displays a success message.
   * @param message The message to display.
   */
  success(message: string): void {
    this.toastr.success(message);
  }

  /**
   * Displays an error message.
   * @param message The message to display.
   */
  error(message: string): void {
    this.toastr.error(message);
  }

  /**
   * Displays a warning message.
   * @param message The message to display.
   */
  warning(message: string): void {
    this.toastr.warning(message);
  }

  /**
   * Displays an informational message.
   * @param message The message to display.
   */
  info(message: string): void {
    this.toastr.info(message);
  }

  /**
   * Clears all toastr notifications.
   */
  clear(): void {
    this.toastr.clear();
  }
}
