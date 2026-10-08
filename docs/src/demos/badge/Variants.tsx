import { Badge } from 'officehut/react';

export default function Variants() {
  return (
    <div className='stack gap-3'>
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <div key={variant} className='cluster'>
          <code className='fs-xs' style={{ width: '4rem' }}>
            {variant}
          </code>
          <Badge variant={variant}>Draft</Badge>
          <Badge variant={variant} color='primary'>
            Submitted
          </Badge>
          <Badge variant={variant} color='success'>
            Approved
          </Badge>
          <Badge variant={variant} color='warning'>
            Pending
          </Badge>
          <Badge variant={variant} color='danger'>
            Rejected
          </Badge>
          <Badge variant={variant} color='aurora' pill>
            Q4
          </Badge>
        </div>
      ))}
    </div>
  );
}
