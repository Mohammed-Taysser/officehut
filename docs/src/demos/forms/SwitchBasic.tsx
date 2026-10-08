import { useState } from 'react';
import { Switch } from 'officehut/react';

export default function SwitchBasic() {
  const [away, setAway] = useState(false);

  return (
    <div className='stack gap-3' style={{ maxWidth: 380 }}>
      <Switch
        checked={away}
        onChange={(e) => setAway(e.target.checked)}
        hint={
          away
            ? 'Replies go out from 18 to 25 October.'
            : 'Colleagues see you as available.'
        }
      >
        Out of office
      </Switch>
      <Switch defaultChecked>Show my desk number in the directory</Switch>
      <Switch disabled>Share calendar with external guests</Switch>
    </div>
  );
}
