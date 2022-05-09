import type { NextApiRequest, NextApiResponse } from 'next'
import projectData from '../../../public/data.json'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(200).json(projectData)
}