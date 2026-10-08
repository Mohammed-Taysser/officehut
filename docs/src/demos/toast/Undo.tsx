import { useState } from 'react';
import { Badge, Button, toast } from 'officehut/react';

export default function Undo() {
  const [archived, setArchived] = useState(false);
  const archive = () => {
    setArchived(true);
    toast({
      message: 'OPS-302 archived',
      duration: 8000,
      action: { label: 'Undo', onClick: () => setArchived(false) },
    });
  };
  return (
    <div className='hstack gap-3'>
      <span>OPS-302 · New hire laptop ready</span>
      {archived ? (
        <Badge>Archived</Badge>
      ) : (
        <Button size='sm' onClick={archive}>
          Archive
        </Button>
      )}
    </div>
  );
}
