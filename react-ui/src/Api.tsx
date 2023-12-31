
export type Link = {
  id: number
  url: string
  create_ts: string
  shortId: string
}


export async function createtLink (url: string): Promise<Link> {
  const res = await fetch('/links', {
    method: 'POST',
    body: url
  })

  if (res.status === 200 || res.status === 201) {
    return res.json() as Promise<Link>
  } else {
    throw new Error(`received ${res.status} response when trying to create shortlink`)
  }
}
