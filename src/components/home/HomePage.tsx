import React, { useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from './InPageNavigation'
import HomeFeed from './HomeFeed'
import TrendingBlogs from './TrendingBlogs'
import { TrendingUp } from 'lucide-react'

type Props = {}

function HomePage({}: Props) {
  let categories = [
    'programing',
    'hollywood',
    'film making',
    'sociel media',
    'tech',
    'finances'
  ]
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
            <TrendingBlogs />
          </InPageNavigation>
        </div>
        <div className='min-w-[40%] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden lg:min-w-[400px]'>
          <div className='flex flex-col gap-10'>
            <div>
              <h1 className='mb-8 text-xl font-medium'>
                Stories from all interests
              </h1>
              <div className='flex flex-wrap gap-3'>
                {categories.map((category, index) => (
                  <button className='tag' key={index}>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className='mb-8 flex text-xl font-medium'>
                Trending
                <TrendingUp className='ml-2' />
              </h1>
              {/* trending blog */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
