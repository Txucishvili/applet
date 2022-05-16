import React, { Suspense } from 'react';
import WidgetMain from './WidgetMain'

// const WidgetMain = React.lazy(() => import('./WidgetMain'));

const Widget2 = () => {
  return <WidgetMain />
}

export default Widget2;