function displayFields(form,customHTML){
    // NAO PERMITE IMPRESSAO DO FORMULARIO
    form.setHidePrintLink(true);

    var state         = getValue("WKNumState" );
    var nextState	  = getValue("WKNextState");
    var numChamado    = getValue("WKNumProces"); 
    var usuarioCodigo = getValue("WKUser"     );
    var agora         = new Date().toLocaleString('pt-BR');
    var usuarioNome   = "";
    var usuarioMail   = "";
    
	if(form.getValue("numChamado")==''||form.getValue("numChamado")=='0'){
        form.setValue("numChamado"       , numChamado); 
        form.setValue("dtAberturaChamado", agora); 
	}
    var c1 = DatasetFactory.createConstraint("colleagueId", usuarioCodigo, usuarioCodigo, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null);
    if (ds.rowsCount > 0) {
        usuarioNome = ds.getValue(0, "colleagueName");
        usuarioMail = ds.getValue(0, "mail");
    }

	if(state<=4)
	    if (form.getValue("codSolicitante")=="") {
	        form.setValue("codSolicitante"  , usuarioCodigo);
	        form.setValue("nomeSolicitante" , usuarioNome  );
	        form.setValue("emailSolicitante", usuarioMail  );
	    }

    customHTML.append("<script language='javascript'>");
	customHTML.append("  function getAtividade(){return '" +state				+"'};");
	customHTML.append("  function getProxima()  {return '" +nextState			+"'};");
	customHTML.append("  function getFormMode() {return '" +form.getFormMode()	+"'};");
	customHTML.append("  function getUser()     {return '" +usuarioCodigo       +"'};");
	customHTML.append("  function getNameUser() {return '" +usuarioNome         +"'};");
	customHTML.append("  function getProcess()  {return '" +numChamado		    +"'};");
    customHTML.append("</script>");
}
