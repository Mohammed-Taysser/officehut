import { Badge, Button } from 'officehut/react';

export default function Stacks() {
  return (
    <div className='grid cols-1 cols-md-3 gap-5'>
      <div>
        <h6 className='mb-2'>.stack</h6>
        <div className='stack gap-2'>
          <Button block>Approve</Button>
          <Button block variant='ghost'>
            Ask for changes
          </Button>
        </div>
      </div>
      <div>
        <h6 className='mb-2'>.hstack</h6>
        <div className='hstack'>
          <strong>INV-2041</strong>
          <Badge color='success'>Paid</Badge>
          <span className='ms-auto tabular-nums'>5,060.00</span>
        </div>
      </div>
      <div>
        <h6 className='mb-2'>.cluster</h6>
        <div className='cluster'>
          {['Finance', 'Q4', 'Travel', 'Needs receipt', 'Cairo office'].map(
            (t) => (
              <Badge key={t} variant='outline'>
                {t}
              </Badge>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
