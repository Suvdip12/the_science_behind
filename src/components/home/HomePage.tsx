import React, { useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from './InPageNavigation'
import HomeFeed from './HomeFeed'

type Props = {}

function HomePage({}: Props) {
  return (
    <div>
      <section className='h-cover flex justify-center gap-10'>
        {/* latest blog */}
        <div className='w-full'>
          <InPageNavigation
            defaultHidden={['trending blogs']}
            routes={['home', 'trending blogs']}
          >
            <HomeFeed />
            <h1>2</h1>
          </InPageNavigation>
        </div>
      </section>
    </div>
  )
}

export default HomePage
