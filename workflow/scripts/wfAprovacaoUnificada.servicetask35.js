function servicetask35(attempt, message) {
	// CONFIRMAR SE O BANCO DE DADOS LIBEROU O COMMIT DO FORM ANTES DE TESTAR A VALIDACAO
	// FAZER 3 TENTATIVAS A CADA 2 MINUTOS
	var numChamado = hAPI.getCardValue("numChamado");
	var usuario    = getValue('WKUser'); //matricula do usuário corrente

	// Verifica se o usuário atual é o responsável pela aprovação
	log.info("### AprovacaoUnificada.servicetask36 - numChamado: "+numChamado);
	log.info("### AprovacaoUnificada.servicetask36 - usuario: "+usuario);

	var params = new Array();
		params.push( DatasetFactory.createConstraint("numChamado",numChamado,'',ConstraintType.MUST) );
	var dsExecutados = DatasetFactory.getDataset("DS_ALCADAS_EXECUTADAS",null,params,null);
	log.info("### AprovacaoUnificada.servicetask36 - DS_ALCADAS_EXECUTADAS");
	log.dir(dsExecutados);
	
	var achei='nao';
	if(dsExecutados.rowsCount > 0)
		for (var i1 = 0; i1 < dsExecutados.rowsCount; i1++) {
			var status = ''+dsExecutados.getValue(i1, "apvStatus");
			if(status =='nao_confirmado'){
				achei='sim';
				break;
			}
		}
	else 
		achei='vazio';
	
	log.info("### AprovacaoUnificada.servicetask36 - achei: "+achei);
	return achei;
}
