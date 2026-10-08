import { Checkbox, Radio } from 'officehut/react';

export default function CheckStates() {
  return (
    <div className='grid cols-1 cols-sm-3'>
      <div className='stack gap-2'>
        <Checkbox size='sm' defaultChecked>
          Small
        </Checkbox>
        <Checkbox defaultChecked>Medium</Checkbox>
        <Checkbox size='lg' defaultChecked>
          Large
        </Checkbox>
      </div>
      <div className='stack gap-2'>
        <Checkbox color='success' defaultChecked>
          Paid
        </Checkbox>
        <Checkbox color='danger' defaultChecked>
          Disputed
        </Checkbox>
        <Checkbox color='aurora' indeterminate>
          Partly filed
        </Checkbox>
      </div>
      <div className='stack gap-2'>
        <Checkbox invalid>I accept the travel policy</Checkbox>
        <Radio name='state-demo' disabled>
          Disabled
        </Radio>
        <Radio name='state-demo' disabled defaultChecked>
          Disabled, chosen
        </Radio>
      </div>
    </div>
  );
}
