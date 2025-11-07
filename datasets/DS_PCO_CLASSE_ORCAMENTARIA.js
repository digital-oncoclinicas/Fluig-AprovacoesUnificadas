function defineStructure() {
	//CAMPOS NOVOS PCO 14/11 - RICARDO ANDRADE e HEITOR CORDEIRO.
	addColumn("CLASSE_ORC");
	addColumn("DESCRICAO");
	addColumn("FILTRO");

	// CHAVE PRIMARIA
	setKey([ "CLASSE_ORC" ]);

	// INDICES PARA PESQUISA
	addIndex([ "CLASSE_ORC" ]);
	addIndex([ "DESCRICAO" ]);
}

// http://oncoclinicasdo138877.protheus.cloudtotvs.com.br:4050/rest_des/WSRESTPCOCLA?FILIAL=00101
var endPoint   = "/WSRESTPCOCLA?FILIAL=";

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetFactory.newDataset();
    // dataset.addColumn("CLASSE_ORC");
	// dataset.addColumn("DESCRICAO");
	
	log.info('### DS_PCO_CLASSE_ORCAMENTARIA iniciado...');

	//PARAMETRO FILIAL EH DE PREENCHIMENTO OBRIGATORIO
	var FILIAL     = "00101",
		CLASSE_ORC = "",
		DESCRICAO  = "";

	if (constraints !== undefined && constraints !== '' && constraints != null) 		
		for (var i in constraints) 
			if (constraints[i].fieldName == "FILIAL") 
				FILIAL = constraints[i].initialValue.trim();
			else
			if (constraints[i].fieldName == "CLASSE_ORC") 
				CLASSE_ORC = constraints[i].initialValue;
			else
			if (constraints[i].fieldName == "DESCRICAO") 
				DESCRICAO = constraints[i].initialValue;
			
	// CHAMAR A CONSULTA REST
	endPoint += FILIAL; 
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

    var ClientService = fluigAPI.getAuthorizeClientService();
    var response      = ClientService.invoke(JSONUtil.toJSON(data));
	log.info('### DS_PCO_CLASSE_ORCAMENTARIA - response:');
    log.dir(response);
    var httpStatus    = response.getHttpStatusResult();
    var result        = JSON.parse( response.getResult() );

    log.info('### DS_PCO_CLASSE_ORCAMENTARIA - result:');
    log.dir(result);

    /**
      "result": [
                    {
                        "CLASSE_ORC": "000004",
                        "DESCRICAO": "ENGENHARIA"
                    },
				]
     */

    if (httpStatus == 200) {
		for (var x in result) {
			if ((CLASSE_ORC == "" || result[x].CLASSE_ORC.indexOf(CLASSE_ORC) !== -1) &&
				(DESCRICAO  == "" || result[x].DESCRICAO.indexOf(DESCRICAO) !== -1)
			) {
				// CLASSE ORCAMENTARIA EH COMPARTILHADA PARA TODAS AS FILIAIS
				dataset.addRow(new Array(
					result[x].CLASSE_ORC,
					result[x].DESCRICAO,
					result[x].CLASSE_ORC+' - '+result[x].DESCRICAO
				));
			}
		}	
		log.info('### DS_PCO_CLASSE_ORCAMENTARIA finalizado.');
		return dataset;
    } else {
    	log.error('### DS_PCO_CLASSE_ORCAMENTARIA error: ');
    	log.dir(result);
		dataset.addRow(new Array(result));
		return dataset;
    }
}
