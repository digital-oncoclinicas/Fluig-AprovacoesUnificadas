function defineStructure() {
	//CAMPOS NOVOS PCO 14/11 - RICARDO ANDRADE e HEITOR CORDEIRO.
	addColumn("FILIAL");
	addColumn("CLASSE_VLR");
	addColumn("DESCRICAO");
	addColumn("TIPO_CLASSE");
	addColumn("BLOQUEIO");
	addColumn("CLASSE_APURACAO");
	addColumn("CLASSE_PONTE");
	addColumn("FILTRO");

	// CHAVE PRIMARIA
	setKey([ "FILIAL", "CLASSE_VLR" ]);

	// INDICES PARA PESQUISA
	addIndex([ "FILIAL" ]);
	addIndex([ "CLASSE_VLR" ]);
	addIndex([ "DESCRICAO" ]);
}

// http://oncoclinicasdo138877.protheus.cloudtotvs.com.br:4050/rest_des/WSRESTCTAPCO?FILIAL=00101
var endPoint   = "/WSRESTCTAPCO?FILIAL=";

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetFactory.newDataset();
	// dataset.addColumn("FILIAL");
	// dataset.addColumn("CLASSE_VLR");
	// dataset.addColumn("DESCRICAO");
	// dataset.addColumn("TIPO_CLASSE");
	// dataset.addColumn("BLOQUEIO");
	// dataset.addColumn("CLASSE_APURACAO");
	// dataset.addColumn("CLASSE_PONTE");
	
	log.info('### DS_PCO_CLASSE_VALOR iniciado...');

	//PARAMETRO FILIAL EH DE PREENCHIMENTO OBRIGATORIO
	var FILIAL     = "00101",
		CLASSE_VLR = "",
		DESCRICAO  = "";

	if (constraints !== undefined && constraints !== '' && constraints != null) 		
		for (var i in constraints) 
			if (constraints[i].fieldName == "FILIAL") 
				FILIAL = constraints[i].initialValue.trim();
			else
			if (constraints[i].fieldName == "CLASSE_VLR") 
				CLASSE_VLR = constraints[i].initialValue;
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
	log.info('### DS_PCO_CLASSE_VALOR - response:');
    log.dir(response);
    var httpStatus    = response.getHttpStatusResult();
    var result        = JSON.parse( response.getResult() );

    log.info('### DS_PCO_CLASSE_VALOR - result:');
    log.dir(result);

    /**
      "result": [
					{
						"FILIAL"         : "",
						"CLASSE_VLR"     : "0001",
						"DESCRICAO"      : "IMPLANTACAO TASY CLINICAS QT + RT",
						"TIPO_CLASSE"    : "Analitica",
						"BLOQUEIO"       : "Nao",
						"CLASSE_APURACAO": "0001",
						"CLASSE_PONTE"   : ""
					}
				]
     */

    if (httpStatus == 200) {
		for (var x in result) {
			if ((CLASSE_VLR == "" || result[x].CLASSE_VLR.indexOf(CLASSE_VLR) !== -1) &&
				(DESCRICAO  == "" || result[x].DESCRICAO.indexOf(DESCRICAO) !== -1)
			) {
				// SE A FILIAL RETORNAR DO PROTHEUS PREENCHIDA ESTE ORCAMENTO DO PCO EH EXCLUSIVO PARA A FILIAL
				var xFILIAL = result[x].FILIAL;
				if(xFILIAL == FILIAL || xFILIAL == '')
					dataset.addRow(new Array(
						result[x].FILIAL,
						result[x].CLASSE_VLR,
						result[x].DESCRICAO,
						result[x].TIPO_CLASSE,
						result[x].BLOQUEIO,
						result[x].CLASSE_APURACAO,
						result[x].CLASSE_PONTE,
						result[x].CLASSE_VLR+' - '+result[x].DESCRICAO						
					));
			}
		}	
		log.info('### DS_PCO_CLASSE_VALOR finalizado.');
		return dataset;
    } else {
    	log.error('### DS_PCO_CLASSE_VALOR error: ');
    	log.dir(result);
		dataset.addRow(new Array(result));
		return dataset;
    }
}
