import { Kbd } from 'officehut/react';

export default function Pencil() {
  return (
    <div className='notebook' style={{ maxWidth: 460 }}>
      <p className='handwriting'>Spreadsheet shortcuts to remember:</p>
      <p>
        <Kbd variant='pencil' keys={['Ctrl', ';']} /> today's date
      </p>
      <p>
        <Kbd variant='pencil' keys={['Alt', '=']} /> sum the column
      </p>
      <p>
        <Kbd variant='pencil'>F4</Kbd> lock the cell reference
      </p>
    </div>
  );
}
