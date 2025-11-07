/**
 * VALIDACAO DOS CAMPOS DO FORMULARIO/ATIVIDADES
 * VERSAO 1.00
 */ 
var msg,arrayMsg,state;
var beforeSendValidate = function (numState, nextState) {
	// SE ESTIVER REFAZENDO OS APROVADORES LIMPAR A TABELA targetAprovadores
	if (numState ==5 && nextState == 13) {
		$('table[tablename=targetAprovadores] tbody tr:not(:first)').remove();
		// $('table[tablename=targetAutorizacoes] tbody tr:not(:first)').remove();
		$(':input, :radio, select, #tipoProposta, #numVenda').removeAttr('disabled');
		return true;
	}

    // INICIAR CAMPOS DE CONTROLE
    msg      = "Favor verificar os seguintes campos: \n\n ";
    arrayMsg = [];
    state    = numState;

    //	ATIVIDADES
    var inicio =  4;

    if (state ==5) {
		if($('#rdAprovado-1')[0].checked==false && $('#rdAprovado-2')[0].checked==false) 
			arrayMsg.push(' &bull; (1) É necessário confirmar se a solicitação foi aprovada ou não.');
		
		if($('#seAprovado').val() =='nao_confirmado')
			arrayMsg.push(' &bull; (2) É necessário confirmar se a solicitação foi aprovada ou não.');
		
		if($('#rdAprovado-2')[0].checked==true && $('#txtObservacao').val()=='') 
			arrayMsg.push(' &bull; Favor informar a observação para a reprovação.');
		
	}
    
	/** RESULTADO FINAL */
	var msgFinal = msg + arrayMsg.join('');
	if(msgFinal !== msg) {
		avisoMODAL('É necessário ajuste nas informações do formulário',arrayMsg, 'danger');
		return false;
	} else {
		// TUDO VALIDADO - ADICIONAR REGISTRO NA TABELA targetAutorizacoes SOMENTE NA ATIVIDADE 5 - APROVADOR
		if (state ==5) {
			var apvMAIL       = parent.WCMAPI.userEmail;
			var apvSubstituto = '';
			var index         = wdkAddChild('targetAutorizacoes');
			$('#apvQuando___'	 +index).val(new Date().toLocaleDateString()); 
			$('#apvNome___'		 +index).val( $('#nomeAprovador').val()		);
			$('#apvSubstituto___'+index).val( apvSubstituto 				);
			$('#apvEMail___'	 +index).val( apvMAIL       				);
			$('#apvDecisao___'   +index).val( $('#rdAprovado-1').is(':checked') ? 'Aprovado' : 'Reprovado' );
			$('#apvObs___'		 +index).val( $('#txtObservacao').val()		);

			// BUSAR O LOGIN DO USUARIO SUBSTITUIDO CONF ATIVIDADE NO DATASET PROCESSTASK 
			var params = new Array();
				params.push( DatasetFactory.createConstraint("processTaskPK.processInstanceId",getProcess(),getProcess(),ConstraintType.MUST) );	
				params.push( DatasetFactory.createConstraint("active"                         ,true        ,true        ,ConstraintType.MUST) );
				params.push( DatasetFactory.createConstraint("processTaskPK.companyId"        ,1           ,1           ,ConstraintType.MUST) );

			// RECUPERAR O VALOR EM processTaskPK.colleagueId
			var dataset = DatasetFactory.getDataset("processTask", null,params,null);
			var xResponsavel = dataset.values[0]['processTaskPK.colleagueId'];

			// GRAVAR DECISAO NA TABELA targetAprovadores CAMPO apvStatus___ CONFORME USUARIO LOGADO
			var rows   = $("#targetAprovadores tbody tr").length;
			for (var x1 = 1; x1 <= rows; x1++) {
				var xLOGIN  = $('#apvLogin___'+x1).val();
				var xLOGADO = getUser(); 
				if(xLOGIN == xLOGADO || xLOGIN == xResponsavel) {
					$('#apvStatus___'+x1).val( $('#rdAprovado-1').is(':checked') ? 'Aprovado' : 'Reprovado' );
					break;
				}
			}
		}

		// LIBERAR CAMPOS PARA GRAVACAO
		$(':input, :radio, select, #tipoProposta, #numVenda').removeAttr('disabled');
		return true;
	}
}

function avisoMODAL(avTITULO, avMSG, avTIPO) {
	if(avMSG == null || avMSG == '')
		avMSG = ['Favor confirmar os dados do seu formulário'];
	
	if(avTITULO == null || avTITULO == '')
		avTITULO = 'Atenção';
	
	// Garantir que avMSG seja um array
	if(typeof avMSG === 'string') {
		avMSG = [avMSG];
	}
	
	// Determinar ícone baseado no tipo
	var icon = 'fa-info-circle';
	var btnClass = 'btn-info-modern';
	var modalClass = 'modal-info';
	
	switch(avTIPO) {
		case 'success':
			icon = 'fa-check-circle';
			btnClass = 'btn-success-modern';
			modalClass = 'modal-success';
			break;
		case 'danger':
		case 'error':
			icon = 'fa-exclamation-triangle';
			btnClass = 'btn-danger-modern';
			modalClass = 'modal-danger';
			break;
		case 'warning':
			icon = 'fa-exclamation-circle';
			btnClass = 'btn-modern';
			modalClass = 'modal-warning';
			break;
		default:
			icon = 'fa-info-circle';
			btnClass = 'btn-modern';
			modalClass = 'modal-info';
	}

	// Construir conteúdo das mensagens
	var xContent = '<div class="modal-messages">';
	for (var iMSG = 0; iMSG < avMSG.length; iMSG++) {
		xContent += '<p id="p' + iMSG + '" class="modal-message">' + avMSG[iMSG] + '</p>';
	}
	xContent += '</div>';

	// Criar modal moderno
	var modalHTML = '' +
		'<div class="modal-modern" id="fmWF_Aviso" style="display: none;">' +
			'<div class="modal-dialog" role="document">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<h5 class="modal-title">' +
							'<i class="fa ' + icon + '"></i>' +
							avTITULO +
						'</h5>' +
						'<button type="button" class="close" onclick="fecharModal();">' +
							'<i class="fa fa-times"></i>' +
						'</button>' +
					'</div>' +
					'<div class="modal-body">' +
						xContent +
					'</div>' +
					'<div class="modal-footer">' +
						'<button type="button" class="btn-modern ' + btnClass + '" onclick="fecharModal();">' +
							'<i class="fa fa-check"></i> Ok' +
						'</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';

	// Remover modal anterior se existir
	try {
		$('#fmWF_Aviso').remove();
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');
	} catch(e) {
		console.log('Erro ao remover modal anterior:', e);
	}
	
	// Adicionar novo modal ao body
	try {
		$('body').append(modalHTML);
	} catch(e) {
		console.log('Erro ao adicionar modal:', e);
		return;
	}
	
	// Mostrar modal
	try {
		$('#fmWF_Aviso').fadeIn(300);
	} catch(e) {
		console.log('Erro ao mostrar modal:', e);
		// Fallback para alert simples
		alert(avTITULO + ': ' + avMSG.join(', '));
		return;
	}
	
	// Aplicar efeito typewriter se necessário
	setTimeout(function() {
		try {
			for (var iMSG = 0; iMSG < avMSG.length; iMSG++) {
				if(typeof typeWriter === 'function') {
					$('#p' + iMSG).text('');
					typeWriter(avMSG[iMSG], iMSG);
				}
			}
		} catch(e) {
			console.log('Erro no typeWriter:', e);
			// Se der erro no typeWriter, apenas mostrar o texto normal
			for (var iMSG = 0; iMSG < avMSG.length; iMSG++) {
				$('#p' + iMSG).text(avMSG[iMSG]);
			}
		}
	}, 300);
}

function fecharModal() {
	try {
		$('#fmWF_Aviso').fadeOut(300, function() {
			$(this).remove();
			$('.modal-backdrop').remove();
			$('body').removeClass('modal-open');
		});
	} catch(e) {
		console.log('Erro ao fechar modal:', e);
		$('#fmWF_Aviso').remove();
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');
	}
}
