import { Card, Kbd, Table } from 'officehut/react';

const shortcuts = [
  ['Search invoices, people, tickets', ['Ctrl', 'K']],
  ['New expense claim', ['N', 'E']],
  ['Approve selected', ['Ctrl', 'Enter']],
  ['Open filters', ['F']],
  ['Show this sheet', ['?']],
] as const;

export default function Shortcuts() {
  return (
    <Card
      style={{ maxWidth: 440 }}
      header={<span className='fw-semibold'>Keyboard shortcuts</span>}
    >
      <Table size='sm'>
        <tbody>
          {shortcuts.map(([what, keys]) => (
            <tr key={what}>
              <td>{what}</td>
              <td className='text-end'>
                <Kbd
                  keys={[...keys]}
                  separator={keys[0] === 'N' ? 'then' : '+'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
