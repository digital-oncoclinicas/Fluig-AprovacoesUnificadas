// Version: 1.0
// oncoclinicasdo138877.protheus.cloudtotvs.com.br:4050/rest_des/WSRESTPCO?FILIAL=00101&ITEM=012550&CLASSE_ORC=00003&CLASSE_VLR=0003
var endPoint   = "/WSRESTPCO?"; 
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetFactory.newDataset();
		dataset.addColumn("CONTA_ORC"	);
		dataset.addColumn("CLASSE_VLR"	);
		dataset.addColumn("SALDO"		);
		dataset.addColumn("OBSERVACAO"	);

	log.info('### DS_PCO_SALDOS iniciado...');

	//TODOS OS PARAMETROS SAO DE PREENCHIMENTO OBRIGATORIO
	var FILIAL		= '00101',
		ITEM  		= '',
		CLASSE_ORC	= '',
		CLASSE_VLR	= '';

	if (constraints !== undefined && constraints !== '' && constraints != null) 		
		for (var i in constraints) 
			if (constraints[i].fieldName == "FILIAL") 
				FILIAL = constraints[i].initialValue.trim();
			else
			if (constraints[i].fieldName == "ITEM") 
				ITEM = constraints[i].initialValue;
			else
			if (constraints[i].fieldName == "CLASSE_ORC") 
				CLASSE_ORC = constraints[i].initialValue;
			else
			if (constraints[i].fieldName == "CLASSE_VLR")
				CLASSE_VLR = constraints[i].initialValue;
			
	// CHAMAR A CONSULTA REST
	endPoint += "FILIAL=" + FILIAL + "&ITEM=" + ITEM + "&CLASSE_ORC=" + CLASSE_ORC + "&CLASSE_VLR=" + CLASSE_VLR;

    var data = {
        companyId  : '1',
        serviceCode: 'ProtheusPCO', 	
        endpoint   : endPoint,		
        method     : 'GET', 			 
        timeoutService: '100', 			
        params     : {},   				
        options: {
            encoding: 'UTF-8',
            mediaType: 'application/json'
		},
		headers: {
			ContentType: 'application/json;charset=UTF-8'
        }
    }

	// FAZ A CHAMADA REST
    var ClientService = fluigAPI.getAuthorizeClientService();
    var response      = ClientService.invoke(JSONUtil.toJSON(data));
    var httpStatus    = response.getHttpStatusResult();
    var result        = JSON.parse( response.getResult() );

    /**
      "result": [
	  				{
	  					"CONTA_ORC"	: "120501010009 - VEICULOS",
						"CLASSE_VLR": "0003 - LICENCIAMENTO MICROSOFT",
						"SALDO"		: 9090000,
						"OBSERVACAO": "Vigencia do Saldo. Data Inicio: 01-11-2024 Data Final: 30-11-2024"
					}
				]
     */

    if (httpStatus == 200) {
		for (var x in result) {
			dataset.addRow(new Array(
				result[x].CONTA_ORC,
				result[x].CLASSE_VLR,
				result[x].SALDO,
				result[x].OBSERVACAO
			));
		}	
		log.info('### DS_PCO_SALDOS finalizado.');
		return dataset;
    } else {
    	log.error('### DS_PCO_SALDOS error: ');
    	log.dir(result);
		dataset.addRow(new Array(result));
		return dataset;
    }
}
