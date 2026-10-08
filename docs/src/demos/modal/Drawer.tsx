import { Avatar, Badge, Button, Modal, useDisclosure } from 'officehut/react';

export default function Drawer() {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open ticket OPS-311</Button>
      <Modal
        drawer
        open={open}
        onClose={onClose}
        title='OPS-311 · Printer on 3rd floor jams'
        footer={
          <>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
            <Button color='success' onClick={onClose}>
              Mark resolved
            </Button>
          </>
        }
      >
        <div className='stack gap-4'>
          <div className='cluster'>
            <Badge color='danger'>High</Badge>
            <Badge variant='outline'>Facilities</Badge>
          </div>
          <p>
            Paper jams every 20 pages since Monday. The tray clip looks bent.
          </p>
          <div className='hstack'>
            <Avatar name='Laila Samir' size='sm' circle aria-hidden />
            <span className='fs-sm'>Reported by Laila Samir · 2 hours ago</span>
          </div>
        </div>
      </Modal>
    </>
  );
}
