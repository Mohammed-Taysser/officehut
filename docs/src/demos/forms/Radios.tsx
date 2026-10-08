import { useState } from 'react';
import { Radio, RadioGroup } from 'officehut/react';

export default function Radios() {
  const [type, setType] = useState('annual');

  return (
    <div className='grid cols-1 cols-md-2 gap-6'>
      <RadioGroup
        label='Leave type'
        value={type}
        onChange={setType}
        hint={
          type === 'sick'
            ? 'Attach a doctor’s note for more than two days.'
            : undefined
        }
      >
        <Radio value='annual' hint='14 days left this year.'>
          Annual leave
        </Radio>
        <Radio value='sick'>Sick leave</Radio>
        <Radio value='unpaid'>Unpaid leave</Radio>
      </RadioGroup>

      <RadioGroup label='Half day' defaultValue='full' inline>
        <Radio value='full'>Full day</Radio>
        <Radio value='am'>Morning</Radio>
        <Radio value='pm'>Afternoon</Radio>
      </RadioGroup>
    </div>
  );
}
