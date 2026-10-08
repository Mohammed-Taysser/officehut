import { Switch } from 'officehut/react';

export default function SwitchMarks() {
  return (
    <div className='grid cols-1 cols-sm-2'>
      <div className='stack gap-3'>
        <Switch io size='sm' defaultChecked>
          Printer 3F
        </Switch>
        <Switch io defaultChecked>
          Lobby screen
        </Switch>
        <Switch io size='lg'>
          Meeting room heating
        </Switch>
      </div>
      <div className='stack gap-3'>
        <Switch color='success' defaultChecked>
          Auto-approve under EGP 200
        </Switch>
        <Switch color='warning' defaultChecked>
          Flag weekend overtime
        </Switch>
        <Switch color='danger'>Lock September books</Switch>
      </div>
    </div>
  );
}
