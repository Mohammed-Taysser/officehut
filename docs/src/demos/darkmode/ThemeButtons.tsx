// Plain HTML: initAll() handles the clicks. These buttons change the theme of
// the whole docs site, since data-oh-toggle="theme" always targets <html>.
export default function ThemeButtons() {
  return (
    <div className='btn-group' role='group' aria-label='Theme'>
      <button
        type='button'
        className='btn'
        data-oh-toggle='theme'
        data-oh-value='light'
      >
        Day
      </button>
      <button
        type='button'
        className='btn'
        data-oh-toggle='theme'
        data-oh-value='dark'
      >
        Night shift
      </button>
      <button
        type='button'
        className='btn'
        data-oh-toggle='theme'
        data-oh-value='auto'
      >
        Follow system
      </button>
      <button type='button' className='btn btn-ghost' data-oh-toggle='theme'>
        Flip
      </button>
    </div>
  );
}
