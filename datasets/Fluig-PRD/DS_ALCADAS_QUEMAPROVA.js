function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();	
	
    // TABELA
    var const0    = [];
    	const0[0] = DatasetFactory.createConstraint("PROCESSO",'wfAprovacaoUnificada','AprovaçãoUnificada',ConstraintType.MUST);
    var dsFORM    = DatasetFactory.getDataset("DS_GED-FORMS",null,const0,null);
    var TABELA_PRINCIPAL = 'ML001'+dsFORM.getValue(0,"COD_LISTA");
	var targetAprovadores = '2417';
    
    for (var index = 0; index < dsFORM.getRowsCount(); index++) 
    	if(dsFORM.getValue(index,"COD_TABELA")=='targetAprovadores')
    		targetAprovadores  = 'ML001'+dsFORM.getValue(index,"COD_LISTA_FILHO");
	
	var minhaQuery =
		"SELECT IT1.apvSequencia, IT1.apvLogin, ML.documentid, IT1.apvStatus "+
		"	FROM "+TABELA_PRINCIPAL+" ML, DOCUMENTO D  "+
		"	INNER JOIN "+targetAprovadores+" IT1 ON D.NR_DOCUMENTO = IT1.documentid and D.NR_VERSAO = IT1.version "+
		"	WHERE ML.documentId    = D.NR_DOCUMENTO "+
		"		AND ML.version     = D.NR_VERSAO "+
		"		AND D.COD_EMPRESA  = 1 "+
		"		AND D.VERSAO_ATIVA = 1 "+
		"       and IT1.apvStatus  = 'nao_confirmado' "+
		"	    and IT1.apvLogin  <> '' AND IT1.apvLogin IS NOT NULL ";
	
	var documentId = 5794334;
    if (constraints !== null && constraints !== undefined) 
    	for (var i = 0; i < constraints.length; i++) 
    		if (constraints[i].fieldName == 'documentId') 
				documentId = constraints[i].initialValue;
    
	minhaQuery += " AND ML.documentId = "+documentId;
	minhaQuery += " ORDER BY ML.documentid, IT1.apvSequencia";
		
	log.info("start - DS_ALCADAS_QUEMAPROVA QUERY: " + minhaQuery);
	var dataSource = "/jdbc/AppDS";
	
	var conn = null;
	var stmt = null;
	var rs   = null;
	var ic   = new javax.naming.InitialContext();
	var ds   = ic.lookup(dataSource);
	var created = false;
	try {
		conn = ds.getConnection();
		stmt = conn.createStatement();
		rs = stmt.executeQuery(minhaQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			if (!created) {
				for (var i = 1; i <= columnCount; i++) 
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
				created = true;
			}
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj)
					Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
				else
					Arr[i - 1] = null;
			}
			newDataset.addRow(Arr);	
		}
	} catch (e) {
		log.error("### DS_ALCADAS_QUEMAPROVA ERROr --> " + e.message);
		log.dir(TABELA_PRINCIPAL+'|'+targetAprovadores);
		newDataset.addColumn('ERRROR');
		newDataset.addRow([e.message]+'|'+TABELA_PRINCIPAL+'|'+targetAprovadores);
	} finally {
		if (rs   != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}
