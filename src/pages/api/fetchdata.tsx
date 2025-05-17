import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 //basic default handler that just calls node backend
 /*
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
  */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let rp = req.query.path
 if (rp?.includes("companyFacts")) {
    console.log("sending company facts")
    const path = "https://data.sec.gov/api/xbrl/" + rp + ".json"
    const headers = new Headers();
    headers.append("User-Agent", "lola sanchez lsanchez@gcschool.org")
    const options = {
      method: 'GET',
      headers: headers
    };

    console.log("starting request");
    const response = await fetch(path, options);
    console.log(path)
    
    console.log("req finished");
    const tempStr = await response.text(); 
   //const data = await response.json();
    console.log(tempStr);
    res.status(response.status)//.json(data);
    
    
    
  } if (rp?.includes("cik")) {
    if (typeof rp !== "string") {
    rp = rp[0];
    }
    rp = rp.substring(rp.indexOf("cik/") + 4)
    console.log(rp)
    const path = "https://data.sec.gov/api/xbrl/"
    const request = await fetch("https://www.sec.gov/cgi-bin/cik_lookup", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"99\", \"Chromium\";v=\"136\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://www.sec.gov/search-filings/cik-lookup",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "company=" + rp.substring(rp.indexOf("cik/")),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
//TODO later - write in something checking whether the company lookup has zero hits
const data = await request.text()
console.log(data);
const cik = data.substring(data.indexOf(">0") + 1, data.indexOf("</a"))
const name = data.substring(data.indexOf("</a>"))
//console.log(cik) 
const final = [cik, name].toLocaleString();
 //res.json({"message": final})
 
  } else {
    const path = `http://localhost:3000/${req.query.path}`
    console.log(path)
    const request = await fetch(path)
   
   const data = await request.json()
   res.status(request.status).json(data)

  

  }

}

