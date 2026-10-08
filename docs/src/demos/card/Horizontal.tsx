import { Button, Card } from 'officehut/react';

const ROOM =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'%3E%3Crect width='160' height='120' fill='%23e9e5db'/%3E%3Crect x='30' y='52' width='100' height='30' rx='3' fill='%23d3ccbc'/%3E%3Cg fill='%238b53a1' opacity='.55'%3E%3Ccircle cx='45' cy='45' r='7'/%3E%3Ccircle cx='80' cy='45' r='7'/%3E%3Ccircle cx='115' cy='45' r='7'/%3E%3Ccircle cx='45' cy='90' r='7'/%3E%3Ccircle cx='80' cy='90' r='7'/%3E%3Ccircle cx='115' cy='90' r='7'/%3E%3C/g%3E%3C/svg%3E";

export default function Horizontal() {
  return (
    <Card
      horizontal
      image={ROOM}
      imageAlt='Floor plan of room 4B'
      title='Room 4B'
      subtitle='6 seats · screen · whiteboard'
    >
      <p className='card-text'>
        Free until 14:00. Book for up to two hours without approval.
      </p>
      <Button size='sm' color='primary' className='mt-3'>
        Book now
      </Button>
    </Card>
  );
}
