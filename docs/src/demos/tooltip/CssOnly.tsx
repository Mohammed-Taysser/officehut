// No JavaScript: .has-tip shows data-tip on hover and keyboard focus, always above.
export default function CssOnly() {
  return (
    <p>
      Approved by{' '}
      <span
        className='has-tip'
        tabIndex={0}
        data-tip='Mona Adel, Finance lead · 14 Oct 09:12'
      >
        <u>M. Adel</u>
      </span>{' '}
      on Tuesday.
    </p>
  );
}
