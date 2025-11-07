function afterTaskCreate(colleagueId){
    var numChamado = getValue("WKNumProces");
    hAPI.setCardValue('numChamado',numChamado);

    if(hAPI.getCardValue('dtAberturaChamado')==''){
    	var xDT = new Date().toLocaleDateString();
    	hAPI.setCardValue('dtAberturaChamado',xDT);
    }
    
    if(	hAPI.getCardValue('nomeSolicitante')==''){
    	var usuario   = hAPI.getCardValue('codSolicitante');
    	var const1    = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuario,usuario,ConstraintType.MUST);
    	var dsUSU     = DatasetFactory.getDataset("colleague", null,[ const1 ], null);
    	hAPI.setCardValue('nomeSolicitante' ,dsUSU.getValue(0,'colleagueName'));
    	hAPI.setCardValue('emailSolicitante',dsUSU.getValue(0,'mail'));
    }
}
