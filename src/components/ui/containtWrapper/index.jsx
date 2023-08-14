import React from 'react'

function ContainerWrapper({children}) {
  return (
    <div className='container w-[90%] mx-auto'>{children}</div>
  )
}

export default ContainerWrapper