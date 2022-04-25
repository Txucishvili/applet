import React, { Suspense } from 'react';

const WidgetMain = React.lazy(() => import('./WidgetMain'));

const Widget2 = () => {
  return <Suspense fallback={"loading"}>
     <WidgetMain />
  </Suspense>
}

export default Widget2;