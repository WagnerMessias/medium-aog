'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

//Tratamento da intent "contar-dias".
//Nome parâmetro 'data_informada'.
app.intent('contar-dias', (conv, {dataInformada}) => {
    
    let dias = calcularDias(dataInformada);

    //Trata a resposta para o usuário
    if (dias == 1) {
        conv.close('Falta ' + dias + ' dia para a data informada. Até logo');
    } else if (dias > 1){
        conv.close('Faltam ' + dias + ' dias para a data informada. Até logo');
    } else{
       conv.ask('Ops! informe uma data maior que a atual');
    }
    
});

//Calcular a diferença de dias se a data desejada for maior que a atual
function calcularDias(dataHoraInformada){
     
  	 dataHoraInformada = new Date( new Date(dataHoraInformada).toDateString());
     let dataHoraAtual = new Date( new Date().toDateString());
     let diferencaDias = 0;
     
    if(dataHoraInformada.getTime() >  dataHoraAtual.getTime()){
     let timeDif = Math.abs(dataHoraInformada.getTime() - dataHoraAtual.getTime());
     diferencaDias = Math.ceil(timeDif / (1000 * 3600 * 24));
    }
    
    return diferencaDias;
}


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);