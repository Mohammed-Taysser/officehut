import { useState } from 'react';
import { IconCopy } from '@tabler/icons-react';
import { Button, Field, Input, InputGroup } from 'officehut/react';

const LINK = 'https://pay.cairo-tech.net/i/INV-2041';

export default function WithButtons() {
  const [copied, setCopied] = useState(false);

  return (
    <div className='grid cols-1 cols-md-2'>
      <Field label='Purchase order'>
        <InputGroup>
          <Input className='font-mono' placeholder='PO-2026-' />
          <Button color='primary'>Look up</Button>
        </InputGroup>
      </Field>
      <Field
        label='Payment link'
        hint={
          copied
            ? 'Copied — paste it into the email to Delta Freight.'
            : undefined
        }
      >
        <InputGroup>
          <Input readOnly className='font-mono' value={LINK} />
          <Button
            icon={<IconCopy />}
            onClick={() => {
              void navigator.clipboard?.writeText(LINK);
              setCopied(true);
            }}
          >
            Copy
          </Button>
        </InputGroup>
      </Field>
    </div>
  );
}
