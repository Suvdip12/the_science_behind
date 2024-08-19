'use client'
import  { useEffect, useRef, useState } from 'react'
function InPageNavigation({
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
  children
}: {
  routes: string[]
  defaultActiveIndex?: number
  defaultHidden?: string[]
  children: React.ReactNode | React.ReactNode[]
}) {
  const activeTabLineRef = useRef<HTMLHRElement|null>(null)
  const activeTabRef = useRef<HTMLButtonElement|null>(null)
  const [inPageNavIndex, setInPageNavIndex] =
    useState<number>(defaultActiveIndex)

  const changePageState = (btn:HTMLButtonElement, index:number) => {
    let { offsetWidth, offsetLeft } = btn
    if (!activeTabLineRef.current) return
    activeTabLineRef.current.style.width = offsetWidth + 'px'
    activeTabLineRef.current.style.left = offsetLeft + 'px'
    setInPageNavIndex(index)
  }
  useEffect(() => {
    if(activeTabRef.current){
      changePageState(activeTabRef.current, defaultActiveIndex)

    }
  }, [defaultActiveIndex])

  return (
    <>
      <div className='relative mb-8 flex flex-nowrap overflow-x-auto border-b border-grey'>
        {routes.map((route, index) => (
          <button
            ref={index === defaultActiveIndex ? activeTabRef : null}
            onClick={e => changePageState(e.target as HTMLButtonElement, index)}
            className={`p-4 px-5 capitalize ${inPageNavIndex === index ? 'text-black dark:text-white' : 'text-dark-grey'} ${defaultHidden.includes(route) ? 'md:hidden' : ''}`}
            key={index}
          >
            {route}
          </button>
        ))}
        <hr
          ref={activeTabLineRef}
          className='absolute bottom-0 rounded-full border-2 duration-300'
        />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  )
}

export default InPageNavigation
