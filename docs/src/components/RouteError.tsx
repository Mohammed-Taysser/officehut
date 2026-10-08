import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { ErrorSheet } from 'officehut/react';

/** A failed lazy chunk usually means a new deploy — a reload fixes it. */
function isChunkError(error: unknown) {
  return (
    error instanceof Error &&
    /dynamically imported module|Importing a module script failed|error loading dynamically imported module|doesn't provide an export/i.test(
      error.message,
    )
  );
}

/** Route-level error element: the page is marked by the teacher in red pen. */
export function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className='doc-error'>
        <ErrorSheet
          error={error}
          title='This page is missing from the binder'
          remark='wrong page number?'
        >
          <Link to='/docs'>Go back to the contents</Link> or use the page finder
          on the left.
        </ErrorSheet>
      </div>
    );
  }

  if (isChunkError(error)) {
    return (
      <div className='doc-error'>
        <ErrorSheet
          error={error}
          title='This page was rewritten while you were reading'
          remark='please reload'
          showDetails={import.meta.env.DEV}
        >
          A newer version of the docs is available. Reloading picks it up.
        </ErrorSheet>
      </div>
    );
  }

  return (
    <div className='doc-error'>
      <ErrorSheet
        error={error}
        onRetry={() => window.location.reload()}
        retryLabel='Reload'
        showDetails={import.meta.env.DEV}
      />
    </div>
  );
}
