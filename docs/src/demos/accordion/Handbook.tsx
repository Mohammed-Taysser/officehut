// Plain HTML: no JavaScript at all. name="" makes the group exclusive.
export default function Handbook() {
  return (
    <div className='grid cols-1 cols-md-3 gap-5'>
      <div className='stack gap-2'>
        <span className='eyebrow'>Staff handbook</span>
        <h3>Working from home</h3>
        <p className='text-muted'>
          Last reviewed by People Ops, September 2026.
        </p>
      </div>
      <div className='accordion span-md-2'>
        <details className='accordion-item' name='wfh' open>
          <summary>How many days can I work from home?</summary>
          <div className='accordion-body'>
            Two days a week, agreed with your team lead.
          </div>
        </details>
        <details className='accordion-item' name='wfh'>
          <summary>Is equipment provided?</summary>
          <div className='accordion-body'>
            A laptop and a headset. Ask IT for a second screen through a ticket.
          </div>
        </details>
        <details className='accordion-item' name='wfh'>
          <summary>Do I need to be online at fixed hours?</summary>
          <div className='accordion-body'>
            Core hours are 10:00 to 15:00, Cairo time.
          </div>
        </details>
      </div>
    </div>
  );
}
