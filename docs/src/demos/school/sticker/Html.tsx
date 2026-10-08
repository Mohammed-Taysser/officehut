// Plain HTML. --_tilt sets the angle (default -10deg).
export default function Html() {
  return (
    <div className='d-flex flex-wrap align-items-center gap-5'>
      <span className='sticker sticker-star' aria-hidden='true'>
        Top
      </span>
      <span
        className='sticker sticker-scallop sticker-aurora sticker-sm'
        style={{ ['--_tilt' as string]: '8deg' }}
      >
        New
      </span>
    </div>
  );
}
