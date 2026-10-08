import { useState } from 'react';
import { Button, ButtonList } from 'officehut/react';

export default function States() {
  const [saving, setSaving] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <ButtonList>
      <Button
        color='primary'
        loading={saving}
        onClick={() => {
          setSaving(true);
          setTimeout(() => setSaving(false), 1500);
        }}
      >
        Save changes
      </Button>
      <Button aria-pressed={starred} onClick={() => setStarred((s) => !s)}>
        {starred ? '★ Starred' : '☆ Star'}
      </Button>
      <Button disabled>Locked period</Button>
      <Button href='#states' aria-disabled>
        Disabled link
      </Button>
    </ButtonList>
  );
}
