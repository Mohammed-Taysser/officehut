import { Button, Modal, useDisclosure } from 'officehut/react';

export default function Basic() {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button color='primary' onClick={onOpen}>
        Review leave request
      </Button>
      <Modal
        open={open}
        onClose={onClose}
        title='Leave request · Salma Nour'
        footer={
          <>
            <Button variant='ghost' onClick={onClose}>
              Decline
            </Button>
            <Button color='success' onClick={onClose}>
              Approve
            </Button>
          </>
        }
      >
        <p>
          Annual leave, <strong>21–23 October</strong> (3 working days). Omar
          Hany covers her tickets. She has 12 days left this year.
        </p>
      </Modal>
    </>
  );
}
