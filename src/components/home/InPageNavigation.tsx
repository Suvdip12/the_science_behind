'use client'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

function InPageNavigation({
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
  children
}: {
  routes: string[]
  defaultActiveIndex: boolean
  defaultHidden: string[]
  children: React.ReactNode
}) {
  const activeTabLineRef = useRef()
  const activeTabRef = useRef()
  const [inPageNavIndex, setInPageNavIndex] =
    useState<boolean>(defaultActiveIndex)

  const changePageState = (btn, index) => {
    let { offsetWidth, offsetLeft } = btn
    activeTabLineRef.current.style.width = offsetWidth + 'px'
    activeTabLineRef.current.style.left = offsetLeft + 'px'
    setInPageNavIndex(index)
  }
  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex)
  }, [])

  return (
    <>
      <div className='relative mb-8 flex flex-nowrap overflow-x-auto border-b border-grey'>
        {routes.map((route, index) => (
          <button
            ref={index === defaultActiveIndex ? activeTabRef : null}
            onClick={e => changePageState(e.target, index)}
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
