import type { NextApiRequest, NextApiResponse } from 'next'
import projectData from '../../../public/data.json'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { dataItem } : any = req.query
    const item = projectData.products.find((item)=> item.id == dataItem )
    res.status(200).json(item)
}