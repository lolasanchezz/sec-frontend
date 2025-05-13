import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const path = `http://localhost:3000/${req.query.path}`
  console.log(path)
   const request = await fetch(path)
   console.log(request)
   const data = await request.json()
  res.status(request.status).json(data)
}