import { Badge, Card, Timeline } from 'officehut/react';

export default function Logbook() {
  return (
    <Card style={{ maxWidth: 560 }}>
      <Card.Header>
        <span className='font-mono fs-sm text-subtle'>OPS-311</span>
        <Card.Title>Printer on 3rd floor jams</Card.Title>
        <Card.Actions>
          <Badge color='success'>Resolved</Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <Timeline ruled aria-label='Ticket log'>
          <Timeline.Day>Mon 6 Oct</Timeline.Day>
          <Timeline.Item
            time='16:48'
            color='danger'
            title='Opened by Salma Nour'
          >
            Jams on every double-sided job. Tray 2.
          </Timeline.Item>
          <Timeline.Item time='17:05' title='Assigned to Omar Hassan' />
          <Timeline.Day>Tue 7 Oct</Timeline.Day>
          <Timeline.Item time='08:40' color='warning' title='Parts ordered'>
            Pickup roller kit, ETA same day.
          </Timeline.Item>
          <Timeline.Item
            time='13:15'
            color='success'
            title='Fixed — 40 test pages, no jams'
          >
            Closed by Omar. Time spent 1h 20m.
          </Timeline.Item>
        </Timeline>
      </Card.Body>
    </Card>
  );
}
