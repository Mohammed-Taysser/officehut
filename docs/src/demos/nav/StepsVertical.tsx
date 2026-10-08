import { Steps } from 'officehut/react';

export default function StepsVertical() {
  return (
    <div className='grid cols-1 cols-md-2 gap-6'>
      <Steps
        orientation='vertical'
        current={2}
        aria-label='New starter checklist'
        items={[
          { title: 'Contract signed', description: 'HR · 28 Sep' },
          { title: 'Laptop & badge issued', description: 'IT desk · 01 Oct' },
          { title: 'Payroll set up', description: 'Waiting on bank details' },
          { title: 'First-week rota', description: 'Team lead' },
        ]}
      />
      <Steps
        orientation='vertical'
        current={2}
        aria-label='PO-0388 approval route'
        items={[
          { title: 'Requested', description: 'Karim Saleh · 30 Sep' },
          {
            title: 'Budget holder',
            description: 'Returned: quote is out of date',
            error: true,
          },
          { title: 'Procurement' },
          { title: 'Ordered' },
        ]}
      />
    </div>
  );
}
