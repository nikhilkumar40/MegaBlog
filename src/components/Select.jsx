import React, { useId } from 'react'

function Select(
    {
        label,
        className = '',
        options = [],
        ...props
    },
    ref
) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref} {...prop} id={id}>
                {options?.map((opt) => (
                    <option key={opt} id={id} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)