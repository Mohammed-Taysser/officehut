import { Alert } from 'officehut/react';

export default function Tones() {
  return (
    <div className='stack gap-2'>
      <Alert>The payroll export runs every night at 02:00.</Alert>
      <Alert color='info'>
        Office closes at 15:00 on Thursday for the building inspection.
      </Alert>
      <Alert color='success'>All 12 timesheets for week 41 are approved.</Alert>
      <Alert color='warning'>
        Three receipts are still missing from the September claim.
      </Alert>
      <Alert color='danger'>
        The bank rejected payment run PR-0912. No vendors were paid.
      </Alert>
    </div>
  );
}
