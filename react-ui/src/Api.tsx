
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

  return res.json() as Promise<Link>
}
