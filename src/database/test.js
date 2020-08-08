const Database = require('./db.js')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: 'Luciano Barreto',
        avatar: 'https://avatars3.githubusercontent.com/u/62218009?s=460&u=fdcc530d7c5d0a3faf018d731a9ce6794a283645&v=4',
        whatsapp: '11973077022',
        bio: 'Entusiasta de novas tecnologias',
    }

    classValue = {
        subject: 11,
        cost: "100",
        // o proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        // o class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

// await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
// console.log(selectedProffys)

    // consultar as classes de um determinado professor e trazer
    // junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
// console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser maior
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

// console.log(selectClassesSchedules)

})