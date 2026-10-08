import { ErrorSheet } from 'officehut/react';

// ErrorSheet on its own: your title, remark and next steps.
// Objects with status/statusText (fetch responses, router errors) are understood.
export default function Custom() {
  return (
    <ErrorSheet
      error={{ status: 503, statusText: 'Service Unavailable' }}
      title='The leave calendar could not be loaded'
      remark='not your fault'
      onRetry={() => undefined}
      retryLabel='Try again'
      showDetails
    >
      The HR system is being updated tonight until 22:00. Your leave requests
      are saved; you can still email them to hr@ if it is urgent.
    </ErrorSheet>
  );
}
