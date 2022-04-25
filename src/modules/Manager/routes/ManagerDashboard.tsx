import React, { createElement } from 'react'

export const OuterComponent = (props) => {
  return <div>
  Replaced component 2
</div>
}


const WithSomeGuard = ({children}) => {
  console.log("[withSomeGuard]")
  return createElement('div', {children})
}

 function ManagerDashboard() {
  console.log("---[ManagerDashboard]")

  return <WithSomeGuard> 
    el
    </WithSomeGuard>
}


export default ManagerDashboard