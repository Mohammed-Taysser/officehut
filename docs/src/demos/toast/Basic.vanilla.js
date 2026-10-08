// Toasts are created from code; there is no markup to write.
// Only the close button uses the data API (data-oh-dismiss="toast").
import { toast } from 'officehut';

document.querySelector('#send-invoice').addEventListener('click', () => {
  toast({
    title: 'Invoice sent',
    message: 'INV-2041 to Acme Logistics',
    color: 'success',
  });
});

document.querySelector('#save-draft').addEventListener('click', () => {
  toast('Draft saved'); // a string is the message
});

// From the CDN build: Officehut.toast({ ... })
