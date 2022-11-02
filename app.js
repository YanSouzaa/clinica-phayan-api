import express from 'express';
import { addSchedule, getSchedules, getDoctors, getPatients, addPatient, addDoctor } from './dynamo.js';
import cors from 'cors'
import { v4 } from "uuid";

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
            err:'erro ao buscar os agendamentos'
        })
    }
})

app.post('/schedule', async (req, res) => {
    const schedule = req.body;
    schedule.id = v4();
    try{
        const newSchedule = await addSchedule(schedule);
        res.json(newSchedule);
    } catch(error) {
        console.error(error);
        res.status(500).json({err: 'erro ao adicionar agendamento'});
    }
});

app.get('/doctors', async (req, res) => {
    try{
        const doctors = await getDoctors();
        res.json(doctors);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            err:'erro ao buscar os médicos'
        })
    }
})

app.post('/doctor', async (req, res) => {
    const doctor = req.body;
    doctor.id = v4();
    try{
        const newDoctor = await addDoctor(doctor);
        res.json(newDoctor);
    } catch(error) {
        console.error(error);
        res.status(500).json({err: 'erro ao adicionar medico'});
    }
});

app.get('/patients', async (req, res) => {
    try{
        const patients = await getPatients();
        res.json(patients);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            err:'erro ao buscar os pacientes'
        })
    }
})

app.post('/patient', async (req, res) => {
    const patient = req.body;
    patient.id = v4();
    try{
        const newPatient = await addPatient(patient);
        res.json(newPatient);
    } catch(error) {
        console.error(error);
        res.status(500).json({err: 'erro ao adicionar paciente'});
    }
});

const port = process.env.PORT;

app.listen(port, () => {
console.log(`listening on port ${port}`)
})