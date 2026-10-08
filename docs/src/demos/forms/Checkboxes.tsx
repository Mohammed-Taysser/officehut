import { Checkbox, Fieldset } from 'officehut/react';

export default function Checkboxes() {
  return (
    <Fieldset legend='Before you submit' plain style={{ maxWidth: 420 }}>
      <div className='stack gap-2'>
        <Checkbox defaultChecked>Receipts are attached</Checkbox>
        <Checkbox hint='Required for any meal over EGP 1,000.'>
          Guest names are listed
        </Checkbox>
        <Checkbox>Send me a copy of the claim</Checkbox>
        <Checkbox disabled defaultChecked hint='Your manager is set by HR.'>
          Route to Mona Adel
        </Checkbox>
      </div>
    </Fieldset>
  );
}
