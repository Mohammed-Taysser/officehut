import { Alert, Button } from 'officehut/react';

export default function Rich() {
  return (
    <Alert
      color='warning'
      icon
      title='Your contract with CleanCo ends in 14 days'
      actions={
        <>
          <Button size='sm' color='warning'>
            Start renewal
          </Button>
          <Button size='sm' variant='ghost'>
            Remind me next week
          </Button>
        </>
      }
    >
      After 28 October the cleaning schedule for Building A stops. Renewals take
      about a week to sign.
    </Alert>
  );
}
