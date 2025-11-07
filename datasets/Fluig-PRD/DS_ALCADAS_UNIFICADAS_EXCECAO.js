function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();	
	
    // TABELA
    var const0    = [];
    	const0[0] = DatasetFactory.createConstraint("DATASET",'ds_Alcadas','',ConstraintType.MUST);
    var dsFORM    = DatasetFactory.getDataset("DS_GED-FORMS-SIMPLES",null,const0,null);
    var TABELA_PRINCIPAL = 'ML001'+dsFORM.getValue(0,"COD_LISTA");
    for (var index = 0; index < dsFORM.getRowsCount(); index++) {
    	if(dsFORM.getValue(index,"COD_TABELA")=='tbValores')
    		var tbValores = 'ML001'+dsFORM.getValue(index,"COD_LISTA_FILHO");
    	
    	if(dsFORM.getValue(index,"COD_TABELA")=='tbAlcadas')
    		var tbAlcadas  = 'ML001'+dsFORM.getValue(index,"COD_LISTA_FILHO");

    	if(dsFORM.getValue(index,"COD_TABELA")=='tbExcessoes')
    		var tbExcessoes  = 'ML001'+dsFORM.getValue(index,"COD_LISTA_FILHO");
	}
		
	var minhaQuery =
		"SELECT DISTINCT IT3.excessaoNivel, IT3.tipoExcessao, IT3.ccExcessao, IT3.ccExcessao_Id, IT3.justificaExcessao "+
		"  FROM "+TABELA_PRINCIPAL+" ML, DOCUMENTO D, "+tbExcessoes+" IT3 "+
		"  WHERE ML.companyId   = 1 "+
		"    AND ML.documentId  = D.NR_DOCUMENTO "+
		"    AND ML.version     = D.NR_VERSAO "+
		"    AND D.COD_EMPRESA  = 1 "+
		"    AND D.VERSAO_ATIVA = 1 "+
		"    AND IT3.documentId = D.NR_DOCUMENTO "+
		"    AND IT3.version    = D.NR_VERSAO ";
	
    if (constraints !== null && constraints !== undefined) 
    	for (var i = 0; i < constraints.length; i++) 
    		if (constraints[i].fieldName == 'CC') 
    			minhaQuery += " AND IT3.tipoExcessao = 'CC' AND IT3.ccExcessao_Id = '"+constraints[i].initialValue+"'";

    
	log.info("start - DS_ALCADAS_UNIFICADAS_EXCESSAO QUERY: " + minhaQuery);
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
		log.error("### DS_ALCADAS_UNIFICADAS_EXCESSAO ERROr --> " + e.message);
		newDataset.addColumn('ERRROR');
		newDataset.addRow([e.message]);
	} finally {
		if (rs   != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}
