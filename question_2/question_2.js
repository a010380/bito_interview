const { GoogleSpreadsheet } = require('google-spreadsheet');
const puppeteer = require('puppeteer')
 
// Sheet to be write
const SHEET_ID = 'AIzaSyBe1k2lTes___mg-1c5ESlzuz3pIQnEOV4'
 
// Write data to google sheet
async function write_rows(docID, row_data, credentialsPath = './credentials.json') {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(docID)
    // Initialize Auth 
    const creds = require(credentialsPath)
    await doc.useServiceAccountAuth(creds)
    // Loads document properties and worksheets
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    // Set header then write rows
    const header = await sheet.setHeaderRow(['等級', '前 30 天交易量', '', '前 1 天持倉量', 'Maker / Taker', 'Maker / Taker (BITO 折抵 20%)'])
    const rows = await sheet.addRows(row_data)
 
}
 
async function data_gateway(data) {
    data_arr = await tradingFeeRate_tidy(data)
    await write_rows(SHEET_ID, data_arr)
}
 
// get value from element
async function get_value(data) {
    return await data.evaluate(node => node.innerText)
}
 
// tidy up data
async function tradingFeeRate_tidy(data) {
    result = []
    for (var i = 0; i < data.length/6; i++){
        let temp = [await get_value(data[i*6]), await get_value(data[i*6+1]), await get_value(data[i*6+2]), await get_value(data[i*6+3]), await get_value(data[i*6+4]), await get_value(data[i*6+5])]
        result.push(temp)
    }
    return await result
}
 

// puppeteer 
(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false
    })
 
    const page = await browser.newPage()
    await page.goto('https://www.bitopro.com/ns/fees')
    let data = []
    data = await page.$$('[class="sc-7a382b88-0 wuaVU"]')
    await data_gateway(data)
    await browser.close()
})()
 
console.log('Node.js is running..')