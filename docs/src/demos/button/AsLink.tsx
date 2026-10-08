import { Link } from 'react-router';
import { Button, ButtonList } from 'officehut/react';

export default function AsLink() {
  return (
    <ButtonList>
      <Button
        href='https://example.com/invoices/2041.pdf'
        target='_blank'
        rel='noreferrer'
      >
        Open PDF
      </Button>
      <Button as={Link} to='/docs/components/card' color='dark'>
        Router link
      </Button>
    </ButtonList>
  );
}
