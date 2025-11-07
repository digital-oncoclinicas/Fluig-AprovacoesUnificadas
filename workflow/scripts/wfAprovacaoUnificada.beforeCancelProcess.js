function beforeCancelProcess(colleagueId,processId){
	// VERIFICAR SE O WF PAI STATUS DIFERENTE DE 0 - ATIVO
	var params = new Array();
		params.push( DatasetFactory.createConstraint("wfFILHO",processId,processId,ConstraintType.MUST) );
	var dsWF = DatasetFactory.getDataset("dsStatusPai_SubProcesso",null,params,null);
	if(dsWF.values.length > 0)
		if(colleagueId!=dsWF.getValue(0,'COD_MATR_REQUISIT')){
    		/** STATUS 
    		 * when 0 then Aberto
    		 * when 1 then Cancelado 
    		 * when 2 then Finalizado
    		 */
    	    var status = parseInt(dsWF.getValue(0,"STATUS")); 
    	    if(status!=1){
    	    	log.info('### wfTermos.beforeCancelProcess - Cancelamento do WF/Solicitação de Subprocesso não é permitido. Será necessário cancelar o WF de Origem');
    	    	throw "CANCELAMENTO DO WF/SOLICITAÇÃO DE SUBPROCESSO NÃO É PERMITIDO. SERÁ NECESSÁRIO CANCELAR O WF DE ORIGEM";
    	    }
    	}
}
