import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
    region:process.env.AWS_DEFAULT_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const SCHEDULES_TABLE = 'phayan_schedules';
const DOCTORS_TABLE = "phayan_doctors";
const PATIENTS_TABLE = "phayan_patients";

const getSchedules = async() => {
    const params = {
        TableName : SCHEDULES_TABLE
    }

const characters = await dynamoClient.scan(params).promise();
console.log(characters)
return characters
}

const addSchedule = async(schedule) => {
    const params = {
        TableName : SCHEDULES_TABLE,
        Item : schedule,
    }
return await dynamoClient.put(params).promise();
}

const getDoctors = async () => {
    const params = {
        TableName : DOCTORS_TABLE,
    }
    
    return dynamoClient.scan(params).promise();
}

const addDoctor = async(doctor) => {
    const params = {
        TableName : DOCTORS_TABLE,
        Item : doctor,
    }
return await dynamoClient.put(params).promise();
}

const getPatients = async () => {
    const params = {
        TableName : PATIENTS_TABLE,
    }
    
    return dynamoClient.scan(params).promise();
}

const addPatient = async(patient) => {
    const params = {
        TableName : PATIENTS_TABLE,
        Item : patient,
    }
return await dynamoClient.put(params).promise();
}



export {dynamoClient,getSchedules,addSchedule, getDoctors, addDoctor, getPatients, addPatient}