import { Accordion } from 'officehut/react';

export default function Exclusive() {
  return (
    <Accordion exclusive style={{ maxWidth: 560 }}>
      <Accordion.Item title='Step 1 · Vendor details' defaultOpen>
        Legal name, tax registration number and the address on their invoices.
      </Accordion.Item>
      <Accordion.Item title='Step 2 · Bank account'>
        IBAN and a stamped letter from the bank. Finance checks it before the
        first payment.
      </Accordion.Item>
      <Accordion.Item title='Step 3 · Contract'>
        Upload the signed framework agreement as a PDF.
      </Accordion.Item>
    </Accordion>
  );
}
