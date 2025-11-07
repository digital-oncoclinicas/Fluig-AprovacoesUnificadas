# 🏥 Aprovações Unificadas - Oncoclinicas

Sistema de **Aprovações Unificadas** desenvolvido para a plataforma Fluig, que automatiza e centraliza o processo de aprovações baseado em alçadas empresariais.

## 📋 Descrição

Este sistema automaticamente identifica e designa aprovadores para solicitações com base em:

- **💰 Valor da solicitação** - Diferentes níveis de aprovação por valor
- **🏢 Centro de Custo** - Aprovadores específicos por área
- **🌍 Filial** - Responsáveis locais e regionais  
- **📋 Tipo de Solicitação** - Especialistas por categoria (reembolso, adiantamento, etc.)
- **📜 Classe de Valor** - Limites de alçada predefinidos

## 🚀 Funcionalidades

### ⚙️ **Automação Inteligente**
- ✅ Identificação automática de aprovadores
- ✅ Prevenção de conflitos de interesse
- ✅ Conversão automática de moedas
- ✅ Validação de regras de negócio

### 🎯 **Interface Moderna**
- ✅ Design responsivo e profissional
- ✅ FAQ interativo com busca
- ✅ Visualização de documentos integrada
- ✅ Histórico detalhado de aprovações

### 🔧 **Recursos Avançados**
- ✅ Carta de exceção para casos especiais
- ✅ Substituição automática de aprovadores
- ✅ Logs detalhados para auditoria
- ✅ Integração com datasets corporativos

## 📁 Estrutura do Projeto

```
├── datasets/               # Datasets e consultas de dados
│   ├── DS_ALCADAS_*.js    # Regras de alçadas
│   └── DS_PCO_*.js        # Dados financeiros
├── forms/                 # Formulários Fluig
│   └── 7972140 - Aprovações Unificadas/
│       ├── Aprovação Unificada.html
│       ├── css/           # Estilos personalizados
│       ├── custom/        # JavaScript customizado
│       └── images/        # Recursos visuais
├── workflow/              # Processo de workflow
│   ├── diagrams/          # Diagramas BPMN
│   └── scripts/           # Scripts do processo
├── wcm/                   # Widgets e componentes
│   └── widget/
│       └── PAINEL AUTORIZACAO/
└── README.md             # Documentação
```

## 🎨 **FAQ Interativo**

O sistema inclui um FAQ profissional e acessível com:

- 🔍 **Busca em tempo real** por palavras-chave
- 🏷️ **Filtros por categoria** (Como Funciona, Aprovação, Problemas, Suporte)
- 📱 **Design responsivo** para desktop e mobile
- 🎯 **Accordions interativos** para melhor navegação

### Categorias do FAQ:
- **⚙️ Como Funciona** - Funcionamento do sistema
- **✅ Aprovação** - Processo e prazos
- **⚠️ Problemas** - Erros comuns e soluções  
- **🆘 Suporte** - Como obter ajuda

## 🔧 Instalação

### Pré-requisitos
- Plataforma Fluig (versão 1.6.4 ou superior)
- Acesso administrativo para deploy
- Datasets corporativos configurados

### Deploy no Fluig

1. **Importe os Datasets:**
   ```bash
   # Importe os arquivos da pasta datasets/
   ```

2. **Publique o Formulário:**
   ```bash
   # Importe a pasta forms/7972140 - Aprovações Unificadas/
   ```

3. **Configure o Workflow:**
   ```bash
   # Importe o processo da pasta workflow/
   ```

4. **Publique os Widgets:**
   ```bash
   # Importe os widgets da pasta wcm/widget/
   ```

## 📊 **Datasets Principais**

| Dataset | Descrição |
|---------|-----------|
| `DS_ALCADAS_UNIFICADAS` | Regras de alçada principais |
| `DS_ALCADAS_EXECUTADAS` | Histórico de aprovações |
| `DS_ALCADAS_QUEMAPROVA` | Aprovadores por critério |
| `DS_PCO_CLASSE_VALOR` | Classes de valor financeiro |
| `DS_PCO_SALDOS` | Saldos orçamentários |

## 🔄 **Fluxo de Aprovação**

1. **📝 Solicitação** - Usuário preenche formulário
2. **🤖 Processamento** - Sistema identifica aprovadores
3. **📧 Notificação** - Aprovadores são notificados
4. **✅ Aprovação** - Aprovadores decidem
5. **📈 Finalização** - Processo é concluído

## 🛠️ **Configuração de Alçadas**

As regras de aprovação são configuradas através dos datasets:

```javascript
// Exemplo de regra de alçada
{
  "filial": "001",
  "centroCusto": "90010001", 
  "classeValor": "CAPEX",
  "valorMinimo": 0,
  "valorMaximo": 10000,
  "aprovador": "user.login",
  "nivelAprovacao": 1
}
```

## 📞 **Suporte**

### Para Problemas Técnicos:
**Caminho no ISM:** `SM → TI → Sistemas Corporativos → Fluig → Reportar Problemas`

### Informações Necessárias:
- 🔢 Número do processo
- ❌ Mensagem de erro completa
- 📸 Print da tela
- 📋 Dados: Valor, Centro de Custo, Filial, Tipo

## 👥 **Equipe de Desenvolvimento**

- **Desenvolvimento:** Equipe TI Oncoclinicas
- **Análise:** Área Financeira
- **Homologação:** Gestores de Área

## 📄 **Licença**

Este projeto é propriedade da **Oncoclinicas** e é destinado exclusivamente para uso interno.

---

## 🔄 **Versionamento**

| Versão | Data | Descrição |
|--------|------|-----------|
| 2.5.0 | Nov/2025 | FAQ interativo e melhorias UX |
| 2.4.0 | Ago/2024 | Implementação inicial do projeto |

---

**© 2025 Oncoclinicas - Sistema de Aprovações Unificadas**
