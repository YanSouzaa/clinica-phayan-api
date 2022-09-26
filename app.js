import express from 'express';
import { addSchedule, getSchedules } from './dynamo.js';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/schedules', async (req,res)=>{
    try{
        const schedules = await getSchedules();
        res.json(schedules);
    }catch(error){
        console.error(error)
        res.status(500).json({
            err:'deu error'
        })
    }
})

app.post('/schedule', async (req, res) => {
    const schedule = req.body;
    
    try{
        const newSchedule = await addSchedule(schedule);
        res.json(newSchedule);
    } catch(error) {
        console.error(error);
        res.status(500).json({err: 'something went wrong'});
    }
});

const port = process.env.PORT;

app.listen(port, () => {
console.log(`listening on port ${port}`)
})