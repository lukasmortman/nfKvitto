import dbConnect from '../../lib/dbConnect'
import Info from '../../models/Information'

export default async function handler(req, res) {
    const {method} = req

    await dbConnect()


    try {
        const info = await Info.create(
            JSON.parse(req.body)
        ) /* create a new model in the database */
        res.status(201).json({success: true, data: info})
    } catch (error) {
        res.status(400).json({success: false})
        console.log(error)
        console.log(JSON.parse((req.body)))
    }
}
