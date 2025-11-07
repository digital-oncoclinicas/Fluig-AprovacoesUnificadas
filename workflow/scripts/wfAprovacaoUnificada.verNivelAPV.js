function verificaUltimoAprovador(){
	// VERIFICA SE O ULTIMO APROVADOR EXECTOU A APROVACAO SIM = TRUE OU NAO = FALSE NA TABELA targetAprovadores
   	var nomeTabela   = "targetAprovadores";
   	var numeroLinhas = hAPI.getChildrenIndexes(nomeTabela);
	if (numeroLinhas.length === 0) {
		log.info("### verificaUltimoAprovador: Nenhuma linha encontrada na tabela targetAprovadores.");
		return false;
	}
	var indice       = numeroLinhas[ numeroLinhas.length-1 ];
	var solicitacao  = hAPI.getCardValue("numChamado");
	
	log.info("### verificaUltimoAprovador:"+solicitacao);
	log.info("### verificaUltimoAprovador 0- "+numeroLinhas);
	log.dir(numeroLinhas);
	log.info("### verificaUltimoAprovador 1- "+numeroLinhas[indice]);
	log.info("### verificaUltimoAprovador 2- "+indice);
	
	// Pegue os valores de cada coluna
	var campo1 = hAPI.getCardValue("apvStatus___" + indice);
	if(campo1==undefined || campo1==null || campo1=='')
		return 'Erro';

	log.info("### verificaUltimoAprovador 3- "+campo1);

	// Verifique se o campo é igual a "Aprovado" ou "Reprovado"
	if(campo1 == "Aprovado" || campo1=="Reprovado")
		return 'sim';
	else
		return 'nao';
}

function verificaSeCargaAprovadores(){
	// CONFIRMAR SE A TABELA DE APROVADORES FOI CARREGADA COM SUSCESSO
   	// Identifique o nome do campo da tabela pai-filho
   	var nomeTabela = "targetAprovadores";

   	// Obtenha o número de linhas da tabela
   	var numeroLinhas = hAPI.getChildrenIndexes(nomeTabela);
   	if(numeroLinhas.length<=0)
   		return false;
   	else
   		return true;
}
