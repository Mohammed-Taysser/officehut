import type { ReactNode } from 'react';

export interface LedgerRow {
  name: string;
  type?: string;
  default?: string;
  description: ReactNode;
}

/**
 * Reference table styled like a ledger page: ruled rows, a red margin line,
 * names and types in mono.
 */
export function Ledger({
  title,
  rows,
  kind = 'prop',
}: {
  title?: string;
  rows: LedgerRow[];
  kind?: 'prop' | 'class' | 'var' | 'event' | 'attr';
}) {
  const head = {
    prop: 'Prop',
    class: 'Class',
    var: 'Variable',
    event: 'Event',
    attr: 'Attribute',
  }[kind];
  const showType = rows.some((r) => r.type);
  const showDefault = rows.some((r) => r.default);
  return (
    <figure className='doc-ledger'>
      {title && <figcaption className='doc-ledger-title'>{title}</figcaption>}
      <div className='doc-ledger-scroll'>
        <table>
          <thead>
            <tr>
              <th scope='col'>{head}</th>
              {showType && <th scope='col'>Type</th>}
              {showDefault && <th scope='col'>Default</th>}
              <th scope='col'>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope='row'>
                  <code>{r.name}</code>
                </th>
                {showType && <td className='doc-ledger-type'>{r.type}</td>}
                {showDefault && (
                  <td className='doc-ledger-type'>{r.default ?? '—'}</td>
                )}
                <td>{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
