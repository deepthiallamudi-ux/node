import fs from 'fs'

export const readdata = () => {
    const data=fs.readFileSync('db.json','utf-8')
    return JSON.parse(data)
}

export const writedata = (data) => {
    fs.writeFileSync('db.json',JSON.stringify(data,null,2))  // null,2 is used for pretty printing
}