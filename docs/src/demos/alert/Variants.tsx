import { Alert } from 'officehut/react';

export default function Variants() {
  return (
    <div className='stack gap-3'>
      <Alert color='aurora' icon>
        <strong>soft</strong> (default) · New: you can now attach receipts from
        your phone.
      </Alert>
      <Alert color='aurora' variant='note' icon>
        <strong>note</strong> · A sheet of paper with a coloured margin line.
        Good for remarks that sit next to content.
      </Alert>
      <Alert color='aurora' variant='solid' icon>
        <strong>solid</strong> · Full colour. Use sparingly, for one message per
        screen.
      </Alert>
      <Alert color='warning' size='sm'>
        <strong>size="sm"</strong> · For tight spots like table rows and card
        footers.
      </Alert>
    </div>
  );
}
