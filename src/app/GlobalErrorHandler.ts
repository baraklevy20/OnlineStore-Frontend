import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    handleError(error) {
        // Add logging mechanism, send to server, etc. Here we simply show the error and 'log' it
        console.log(error);

        // The configuration is needed when calling snackbar from outside of Angular's zone
        const config = new MatSnackBarConfig();
        config.panelClass = ['background-red'];
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';

        this.zone.run(() => {
            let errorMessage = error.message;

            // In case error doesn't have a message field
            if (errorMessage) {
                errorMessage = error;
            }

            // Show a snackbar
            this.snackBar.open(error.message, "X", config);
        });
    }
}