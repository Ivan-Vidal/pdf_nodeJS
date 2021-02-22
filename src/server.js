//criei o servidor
//requeri o servidor express do node_Module
const express = require('express');

//pegando o ejs
const ejs = require('ejs')

const puppeteer = require('puppeteer')
//configurações de rotas
const path = require('path');
const { response } = require('express');
const { puppeteerErrors } = require('puppeteer');
const { report } = require('process');




//Coloquei a função express no meu app

const app = express()

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },
    
]

app.get('/pdf', async(request, response) => {
    const browser = await puppeteer.launch({ headless: true})

    const page = await browser.newPage()

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    })
    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)

})

app.get('/', (request, response) => {
    const filePath =  path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { passengers }, (err, html)=>{
        if (err){
            return response.send('Erro na leitura do arquivo')
        }
      
            //Enviar para o navegador
             return response.send(html)
        })
  
    })


//o app está ouvindo com o "LISTEN()"
app.listen(3000)