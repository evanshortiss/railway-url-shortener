import { useEffect, useState } from 'react'
import './App.css'
import { Link, createtLink } from './Api'
import { from } from 'env-var'

function App() {
  const [links, setLinks] = useState<Link[]>([])
  const [url, setUrl] = useState<string|undefined>()
  const { get } = from(import.meta.env)

  const VITE_SHORT_URL_HOST = get('VITE_SHORT_URL_HOST').required().asUrlString()
  const VITE_LINK_TTL_HOURS = get('VITE_LINK_TTL_HOURS').required().asIntPositive()

  useEffect(() => {
    setLinks(getLinks())
  }, [])

  function getLinks () {
    const storedLinks = localStorage.getItem('links')

    if (storedLinks) {
      try {
        return JSON.parse(storedLinks)
      } catch (e) {
        console.error(e)
        return []
      }
    }

    return []
  }

  function updateStoredLinks (link: Link) {
    const storedLinks = getLinks()
    
    storedLinks.push(link)

    localStorage.setItem('links', JSON.stringify(storedLinks))
  }

  function isValidUrl (url: string) {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  async function createLink (e: React.FormEvent<HTMLFormElement>, url: string) {
    e.preventDefault();

    if (!isValidUrl(url)) {
      return alert('Invalid URL')
    }

    try {
      const link = await createtLink(url)
      
      updateStoredLinks(link)
      setUrl(undefined)
      setLinks([...links, link])
    } catch (e) {
      alert(e)
    }
  }

  function buildShortUrl (shortId: string) {
    return new URL(shortId, VITE_SHORT_URL_HOST).toString()
  }

  const noteEls = links
    .sort((a, b) => {
      return new Date(a.create_ts).getTime() < new Date(b.create_ts).getTime() ? 1 : -1
    })
    .map(n => {
      const expire = new Date(n.create_ts)

      expire.setHours(expire.getHours() + VITE_LINK_TTL_HOURS)

      const remainingHours = (expire.getTime() - Date.now()) / 1000 / 60 / 60

      let expireString: string

      if (Math.round(remainingHours) === 1) {
        expireString = `${Math.round(remainingHours)} hour`
      } else if (remainingHours < 1 && remainingHours > 0) {
        const mins = Math.round(remainingHours * 60)
        
        expireString = `${mins} ${mins === 1 ? 'min' : 'mins'}`
      } else if (remainingHours <= 0) {
        expireString = 'Expired'
      } else {
        expireString = `${Math.round(remainingHours)} hours`
      }

      return (
        <li key={n.id} className='flex mt-4 text-xl'>
          <a href={buildShortUrl(n.shortId)} target='_blank' className='text-left underline text-sky-400 w-4/12 pr-2 align-middle my-1 text-left'>{buildShortUrl(n.shortId)}</a>
          <a href={n.url} target='_blank' className='text-left underline text-ellipsis overflow-hidden whitespace-nowrap text-sky-400 w-6/12 pr-2 align-middle my-1 text-left'>{n.url}</a>
          <p className='text-center w-2/12 align-middle my-1'>{expireString}</p>
        </li>
      )
    })

  noteEls.unshift(
    <li key="hardcoded" className='flex mt-4 text-xl text-slate-300'>
      <p className='text-left font-bold w-4/12 pr-1 align-middle my-1 text-left'>Short URL</p>
      <p className='text-left font-bold w-6/12 pr-1 align-middle my-1 text-left'>Original URL</p>
      <p className='text-center font-bold w-2/12 align-middle my-1'>Expires In</p>
    </li>
  )

  return (
    <div className='text-center bg-gray-900 text-slate-100 w-screen h-screen'>
      <h1 className='text-5xl pt-14 pb-10 font-bold italic underline'>li.nk city</h1>
      <p className='text-slate-300'>Create a convenient short URL, you know, a li.nk!</p>
      <form className='my-8' onSubmit={(e) => createLink(e, url || '')}>
        <input
          value={url ? url : ''}
          required={true}
          placeholder={'e.g "http://foo.bar/some-long-url"'}
          className='mr-4 text-xl w-4/12 rounded-md py-2 px-4 border-solid border border-slate-200 text-slate-900'
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          name="content" />

        <input 
          className="rounded-md text-xl py-2 px-6 bg-sky-500 font-semibold text-white"
          type="submit"
          value="Create li.nk" />
      </form>
      {/* <hr className='mt-4 mb-6 mx-48' /> */}
      <div className="border-b solid w-9/12 m-auto border-gray-500"></div>
      <ul className='max-w-screen-lg m-auto'>{noteEls}</ul>
    </div>
  )
}

export default App
