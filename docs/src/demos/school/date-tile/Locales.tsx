import { DateTile } from 'officehut/react';

// Month and weekday names come from Intl.DateTimeFormat in the locale you pass.
export default function Locales() {
  const date = new Date(2026, 9, 6, 12); // 6 October 2026, midday local time
  return (
    <div
      className='d-flex flex-wrap align-items-end gap-5'
      style={{ paddingTop: '0.5rem' }}
    >
      <DateTile date={date} locale='en-GB' />
      <DateTile date={date} locale='fr-FR' band='blue' />
      <DateTile date={date} locale='de-DE' band='green' />
      <div dir='rtl' lang='ar'>
        <DateTile date={date} locale='ar-EG' band='dark' />
      </div>
    </div>
  );
}
