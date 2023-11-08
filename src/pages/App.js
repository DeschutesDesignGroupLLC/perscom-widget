import Awards from './Awards'
import Calendar from './Calendar'
import Form from './Form'
import Forms from './Forms'
import Qualifications from './Qualifications'
import Ranks from './Ranks'
import React, { useEffect, useState } from 'react'
import Roster from './Roster'
import User from './User'
import { Alert } from '../components/Alert'
import { Footer } from '../components/Footer'
import { Navigate, Route, Routes, useSearchParams, useLocation } from 'react-router-dom'
import { Flowbite } from 'flowbite-react'
import Newsfeed from './Newsfeed'
import CredentialService from '../services/CredentialService'
import * as Sentry from '@sentry/react'
import cx from 'classnames'

function App() {
  const [searchParams] = useSearchParams()
  const [darkMode, setDarkMode] = useState(searchParams.get('dark'))

  const theme = {
    card: {
      root: {
        base: 'flex rounded-lg bg-white shadow dark:bg-gray-800',
        children: 'flex h-full flex-col justify-center gap-2 p-6'
      }
    },
    pagination: {
      base: 'ml-auto mr-auto sm:mr-0',
      pages: {
        previous: {
          base: 'ml-0 rounded-l-lg shadow bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        },
        next: {
          base: 'rounded-r-lg shadow bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        },
        selector: {
          base: 'w-12 shadow bg-white py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        }
      }
    },
    tab: {
      base: 'flex flex-col gap-0',
      tablist: {
        tabitem: {
          base: 'flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none'
        }
      },
      tabpanel: 'py-0'
    },
    table: {
      root: {
        shadow: 'absolute bg-white dark:bg-gray-800 w-full h-full top-0 left-0 rounded-lg shadow -z-10'
      }
    }
  }

  const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

  useEffect(() => {
    window.addEventListener('darkMode', (event) => {
      const darkModeEnabled = event.detail.enabled ?? false

      if (document.documentElement.classList.contains('dark') && !darkModeEnabled) {
        document.documentElement.classList.remove('dark')
        setDarkMode('false')
      }

      if (!document.documentElement.classList.contains('dark') && darkModeEnabled) {
        document.documentElement.classList.add('dark')
        setDarkMode('true')
      }
    })
  })

  return (
    <div
      className={cx('font-sans pb-2', {
        dark: darkMode === 'true' || darkMode === '1'
      })}
    >
      <div className='text-gray-500 dark:text-gray-400'>
        <Flowbite theme={{ theme }}>
          <div className='m-0.5'>
            {CredentialService.getApiKey(searchParams) && CredentialService.getPerscomId(searchParams) ? (
              <SentryRoutes>
                <Route path='/' element={<Roster />}></Route>
                <Route path='/awards' element={<Awards />}></Route>
                <Route path='/calendar' element={<Calendar />}></Route>
                <Route path='/forms' element={<Forms />}></Route>
                <Route path='/forms/:id' element={<Form />}></Route>
                <Route path='/newsfeed' element={<Newsfeed />}></Route>
                <Route path='/qualifications' element={<Qualifications />}></Route>
                <Route path='/ranks' element={<Ranks />}></Route>
                <Route path='/roster' element={<Roster />}></Route>
                <Route path='/users/:id' element={<User />}></Route>
                <Route path='*' element={<Navigate to={`/${useLocation().search}`} />}></Route>
              </SentryRoutes>
            ) : (
              <Alert message='Please make sure all required widget parameters have been included.' type='failure' />
            )}
          </div>
          <Footer />
        </Flowbite>
      </div>
    </div>
  )
}

export default App
