import { useEffect, useState } from 'react'
import './App.css'
import { Link, createtLink } from './Api'

function App() {
  const [links, setLinks] = useState<Link[]>([])
  const [url, setUrl] = useState<string|undefined>()

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
    return new URL(shortId, import.meta.env.VITE_SHORT_URL_HOST).toString()
  }

  const noteEls = links.map(n => {
    return (
      <li key={n.id} className='flex mt-4'>
        <a href={n.url} target='_blank' className='text-left underline text-indigo-600 w-5/12 align-middle my-1 text-left'>{n.url}</a>
        <a href={buildShortUrl(n.shortId)} target='_blank' className='text-left underline text-indigo-600 w-5/12 align-middle my-1 text-left'>{buildShortUrl(n.shortId)}</a>
        <p className='text-center w-2/12 align-middle my-1'>{new Date(n.create_ts).toLocaleString()}</p>
      </li>
    )
  })

  noteEls.unshift(
    <li className='flex mt-4'>
      <p className='text-left font-bold w-5/12 align-middle my-1 text-left'>Original URL</p>
      <p className='text-left font-bold w-5/12 align-middle my-1 text-left'>Short URL</p>
      <p className='text-center font-bold w-2/12 align-middle my-1'>Created At</p>
    </li>
  )

  return (
    <div className='container m-auto text-center'>
      <h1 className='text-4xl py-10'>Railway Quarkus URL Shortener</h1>
      <form onSubmit={(e) => createLink(e, url || '')}>
        <input
          value={url ? url : ''}
          required={true}
          placeholder={'e.g "http://foo.bar/some-long-url"'}
          className='mr-4 w-5/12 rounded-md p-2 border-solid border border-slate-200'
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          name="content" />

        <input 
          className="rounded-md py-2 px-6 bg-indigo-500 font-semibold text-white"
          type="submit"
          value="Create Short Link" />
      </form>
      <hr className='mt-4 mb-6 mx-12' />
      <ul className='max-w-screen-lg m-auto'>{noteEls}</ul>
    </div>
  )
}

export default App
