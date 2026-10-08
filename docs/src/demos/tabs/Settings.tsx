import { Alert, Avatar, Badge, Button, Card, Tabs } from 'officehut/react';

export default function Settings() {
  return (
    <Card style={{ maxWidth: 620 }}>
      <Card.Header>
        <Avatar name='Delta Water' size='sm' color='info' />
        <Card.Title>Delta Water Co.</Card.Title>
        <Card.Actions>
          <Badge color='success'>Active</Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <Tabs defaultValue='details'>
          <Tabs.List variant='folder' aria-label='Vendor sections'>
            <Tabs.Tab value='details'>Details</Tabs.Tab>
            <Tabs.Tab value='bank'>Bank</Tabs.Tab>
            <Tabs.Tab value='history'>
              History <Badge pill>6</Badge>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='details'>
            <dl className='stack gap-2'>
              <div className='hstack'>
                <dt className='text-subtle' style={{ width: '8rem' }}>
                  Tax number
                </dt>
                <dd className='font-mono'>412-889-301</dd>
              </div>
              <div className='hstack'>
                <dt className='text-subtle' style={{ width: '8rem' }}>
                  Delivers
                </dt>
                <dd>Sundays and Wednesdays</dd>
              </div>
            </dl>
          </Tabs.Panel>
          <Tabs.Panel value='bank'>
            <Alert
              color='warning'
              size='sm'
              actions={<Button size='sm'>Verify now</Button>}
            >
              Bank details changed on 2 October and haven&apos;t been verified.
            </Alert>
          </Tabs.Panel>
          <Tabs.Panel value='history'>
            Six deliveries this quarter, all on time.
          </Tabs.Panel>
        </Tabs>
      </Card.Body>
    </Card>
  );
}
