import { Alert, Button, Card, Modal, useDisclosure } from 'officehut/react';

export default function Confirm() {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <Card style={{ maxWidth: 420 }}>
      <Card.Body className='stack gap-2'>
        <span className='eyebrow'>Vendor</span>
        <Card.Title>CleanCo Services</Card.Title>
        <p className='text-muted fs-sm'>
          Contract ends 28 October · 4 open invoices
        </p>
      </Card.Body>
      <Card.Footer>
        <Button size='sm' color='danger' variant='soft' onClick={onOpen}>
          Remove vendor
        </Button>
      </Card.Footer>
      <Modal
        open={open}
        onClose={onClose}
        size='sm'
        backdropClose={false}
        title='Remove CleanCo Services?'
        footer={
          <>
            <Button variant='ghost' onClick={onClose} autoFocus>
              Keep vendor
            </Button>
            <Button color='danger' onClick={onClose}>
              Remove
            </Button>
          </>
        }
      >
        <div className='stack gap-3'>
          <p>
            Their four open invoices stay in the ledger, but you won&apos;t be
            able to pay new ones.
          </p>
          <Alert color='warning' size='sm'>
            This can&apos;t be undone from here. Finance can restore the vendor.
          </Alert>
        </div>
      </Modal>
    </Card>
  );
}
