import { Accordion } from 'officehut/react';

export default function Basic() {
  return (
    <Accordion style={{ maxWidth: 560 }}>
      <Accordion.Item
        title='How many days of annual leave do I get?'
        defaultOpen
      >
        21 working days a year, rising to 30 after ten years of service. Unused
        days carry over until 31 March.
      </Accordion.Item>
      <Accordion.Item title='Who approves my request?'>
        Your line manager. Requests longer than ten days also go to People Ops.
      </Accordion.Item>
      <Accordion.Item title='Can I cancel approved leave?'>
        Yes, from the request page, up to the day before it starts.
      </Accordion.Item>
    </Accordion>
  );
}
