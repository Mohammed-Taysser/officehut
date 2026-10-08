import { AVATAR_SIZES, Avatar } from 'officehut/react';

export default function Sizes() {
  return (
    <div className='hstack gap-3'>
      {AVATAR_SIZES.map((size) => (
        <Avatar key={size} size={size} name='Omar Hany' circle />
      ))}
    </div>
  );
}
