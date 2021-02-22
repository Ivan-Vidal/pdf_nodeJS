//criei o servidor
//requeri o servidor express do node_Module
const express = require('express');

//pegando o ejs
const ejs = require('ejs')

//configurações de rotas
const path = require('path')

const pdf = require('html-pdf')


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



app.get('/', (request, response) => {
    const filePath =  path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { passengers }, (err, html)=>{
        if (err){
            return response.send('Erro na leitura do arquivo')
        }
        const options = {
            height: "11.25in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }
        }
        //criar o pdf
        pdf.create(html, options).toFile("report.pdf", (err, data)=>{
            if (err){
                return response.send("Erro ao gerar o PDF")
            }
            //Enviar para o navegador
             return response.send("PDF Gerado com sucesso !")
        })
  

    })

})


//o app está ouvindo com o "LISTEN()"
app.listen(3000)