import { Button, ButtonList, useToast } from 'officehut/react';

export default function Basic() {
  const toast = useToast();
  return (
    <ButtonList>
      <Button
        color='primary'
        onClick={() =>
          toast({
            title: 'Invoice sent',
            message: 'INV-2041 to Acme Logistics',
            color: 'success',
          })
        }
      >
        Send invoice
      </Button>
      <Button onClick={() => toast('Draft saved')}>Save draft</Button>
    </ButtonList>
  );
}
