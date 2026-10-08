import { Button, ButtonList } from 'officehut/react';

export default function Variants() {
  return (
    <ButtonList>
      <Button>Save draft</Button>
      <Button color='primary'>Submit for approval</Button>
      <Button color='primary' variant='soft'>
        Preview
      </Button>
      <Button color='primary' variant='outline'>
        Export
      </Button>
      <Button variant='ghost'>Cancel</Button>
      <Button variant='link'>View history</Button>
    </ButtonList>
  );
}
