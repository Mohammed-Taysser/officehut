import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
} from 'officehut/react';

export default function Arabic() {
  return (
    <div dir='rtl' lang='ar' className='stack gap-3' style={{ maxWidth: 460 }}>
      <Breadcrumb
        label='مسار التنقل'
        items={[
          { label: 'الموارد البشرية', href: '#rtl' },
          { label: 'الإجازات', href: '#rtl' },
          { label: 'طلب رقم ٢١٤' },
        ]}
      />
      <Card status='warning' statusPosition='start'>
        <Card.Header>
          <Avatar name='سلمى نور' circle size='sm' />
          <Card.Title>طلب إجازة سنوية</Card.Title>
          <Card.Actions>
            <Badge color='warning'>قيد المراجعة</Badge>
          </Card.Actions>
        </Card.Header>
        <Card.Body className='stack gap-3'>
          <p>
            طلبت سلمى نور إجازة لمدة <strong>ثلاثة أيام</strong>، من ٢١ إلى ٢٣
            أكتوبر. يغطي عمر مهامها خلال هذه الفترة.
          </p>
          <Alert color='info' size='sm' icon>
            الرصيد المتبقي بعد الموافقة: ٩ أيام.
          </Alert>
        </Card.Body>
        <Card.Footer>
          <Button size='sm' variant='ghost'>
            رفض
          </Button>
          <Button size='sm' color='success' className='ms-auto'>
            موافقة
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
