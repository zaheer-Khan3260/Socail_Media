import React, {useId, forwardRef} from 'react'


const Input = forwardRef(function({
  label,
  type = "text",
  ClassName= "",
  ...props
}, ref){
   const id = useId();

   return (
    <div className='w-full'>
  {
    label && <div 
    className=' mb-1 pl-1'
    htmlFor={id}>
      {label}
    </div>
    
  }
  <input
   type={type}
   id={id}
   className = {`shadow appearance-none border rounded-xl w-[100%] h-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ClassName} `}
   {...props}
   ref={ref}
  />
</div>
   )
})


export default Input;
