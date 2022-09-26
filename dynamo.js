import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
    region:process.env.AWS_DEFAULT_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLENAME = 'phayan_schedules'

const getSchedules = async() => {
    const params = {
        TableName : TABLENAME
    }

const characters = await dynamoClient.scan(params).promise();
console.log(characters)
return characters
}

const addSchedule = async(character) => {
    const params = {
        TableName : TABLENAME,
        Item : character

    }

return dynamoClient.put(params).promise();

}
//addOrUpdateCharacter({'id':'1','nome':'Hermione'})


export {dynamoClient,getSchedules,addSchedule}