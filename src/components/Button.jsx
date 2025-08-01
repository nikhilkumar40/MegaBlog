import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
 <button {...props} className={`${bgColor} ${textColor} px-4 py-2 rounded-lg`}>
    {children}
 </button>
  )
}

export default Button