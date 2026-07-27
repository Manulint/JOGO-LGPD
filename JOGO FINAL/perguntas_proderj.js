// Perguntas do PRODERJ com dificuldade progressiva
const perguntasProderj = [
    {
        "pergunta": "O que a Portaria 825 institui?",
        "opcoes": [
            "Manual de Boas Práticas em TI",
            "Norma de Segurança de Infraestrutura",
            "Política, Estratégia e Normas da Governança de TIC",
            "Guia de Acessibilidade Digital"
        ],
        "resposta": 2,
        "nivel": 1
    },
    {
        "pergunta": "A Estratégia da Governança de TIC visa:",
        "opcoes": [
            "Promover valor público através da boa governança digital",
            "Gerar receita com serviços de TI",
            "Reduzir uso de softwares pagos",
            "Melhorar mobilidade urbana"
        ],
        "resposta": 0,
        "nivel": 1
    },
    {
        "pergunta": "Um dos princípios da Governança de TIC é:",
        "opcoes": [
            "Competitividade",
            "Transparência",
            "Privatização",
            "Controle de gastos"
        ],
        "resposta": 1,
        "nivel": 1
    },
    {
        "pergunta": "O Plano Estratégico de TIC deve estar alinhado com:",
        "opcoes": [
            "ABNT",
            "PEI (Planejamento Estratégico Institucional)",
            "Lei das Estatais",
            "OMC"
        ],
        "resposta": 1,
        "nivel": 1
    },
    {
        "pergunta": "Documento que define missão e visão da governança de TIC:",
        "opcoes": [
            "Política da Governança de TIC",
            "Plano Orçamentário",
            "Estatuto da TIC",
            "Termo de Referência"
        ],
        "resposta": 0,
        "nivel": 1
    },
    {
        "pergunta": "Qual o objetivo principal do Comitê Setorial de Proteção de Dados?",
        "opcoes": [
            "Gerenciar compras públicas",
            "Propor orçamentos de TIC",
            "Zelar pela conformidade com a LGPD",
            "Julgar denúncias"
        ],
        "resposta": 2,
        "nivel": 2
    },
    {
        "pergunta": "Quem coordena o Comitê de Dados?",
        "opcoes": [
            "Presidente da Autarquia",
            "Vice-Presidência de Governo Digital",
            "Vice-Presidência de TI",
            "Comissão de Ética"
        ],
        "resposta": 1,
        "nivel": 2
    },
    {
        "pergunta": "A estrutura do Comitê é formada por:",
        "opcoes": [
            "Ouvidoria e Auditoria",
            "Diretoria Executiva e Comissões Temáticas",
            "Secretaria de Governo e Dataprev",
            "Presidência e Proderj Digital"
        ],
        "resposta": 1,
        "nivel": 2
    },
    {
        "pergunta": "O comitê atua com base em:",
        "opcoes": [
            "Código Civil",
            "Lei Geral de Proteção de Dados (LGPD)",
            "Decreto 41.797",
            "Política Nacional de Inovação"
        ],
        "resposta": 1,
        "nivel": 2
    },
    {
        "pergunta": "A Diretoria Executiva do Comitê pode:",
        "opcoes": [
            "Julgar processos disciplinares",
            "Propor ações de conformidade à LGPD",
            "Fiscalizar contratos",
            "Delegar poderes à Receita Estadual"
        ],
        "resposta": 1,
        "nivel": 2
    },
    {
        "pergunta": "O ciclo de melhoria contínua na segurança da informação é:",
        "opcoes": [
            "SCRUM",
            "PDCA",
            "ITIL",
            "ISO 31000"
        ],
        "resposta": 1,
        "nivel": 3
    },
    {
        "pergunta": "Um princípio da segurança da informação:",
        "opcoes": [
            "Publicidade",
            "Controle",
            "Confidencialidade",
            "Rentabilidade"
        ],
        "resposta": 2,
        "nivel": 3
    },
    {
        "pergunta": "A abrangência da IN nº 02 inclui:",
        "opcoes": [
            "Dados organizacionais, pessoais e físicos",
            "Apenas documentos impressos",
            "Arquivos judiciais",
            "Informações de redes sociais"
        ],
        "resposta": 0,
        "nivel": 3
    },
    {
        "pergunta": "O que é um ativo de informação?",
        "opcoes": [
            "Documento legal",
            "Hardware institucional",
            "Recurso que processa, armazena ou transmite dados",
            "Dados sigilosos"
        ],
        "resposta": 2,
        "nivel": 3
    },
    {
        "pergunta": "O que é vedado quanto a senhas?",
        "opcoes": [
            "Compartilhamento com terceiros",
            "Alteração periódica",
            "Uso de letras e números",
            "Armazenamento criptografado"
        ],
        "resposta": 0,
        "nivel": 3
    },
    {
        "pergunta": "Não-repúdio significa:",
        "opcoes": [
            "Bloqueio de dados indevidos",
            "Impossibilidade de negar autoria de uma ação",
            "Sigilo absoluto",
            "Eliminação automática"
        ],
        "resposta": 1,
        "nivel": 4
    },
    {
        "pergunta": "A IN nº 02 deve ser atualizada:",
        "opcoes": [
            "A cada 5 anos",
            "Periodicamente ou após eventos relevantes",
            "Após licitações",
            "Em caso de denúncias"
        ],
        "resposta": 1,
        "nivel": 4
    },
    {
        "pergunta": "Comissões Temáticas servem para:",
        "opcoes": [
            "Homologar licitações",
            "Substituir a Diretoria Executiva",
            "Tratar temas específicos de proteção de dados",
            "Realizar auditorias"
        ],
        "resposta": 2,
        "nivel": 4
    },
    {
        "pergunta": "A responsabilidade pela segurança da informação é de:",
        "opcoes": [
            "Coordenadores",
            "Setores de TI",
            "Todos com acesso aos ativos",
            "Somente chefias"
        ],
        "resposta": 2,
        "nivel": 4
    },
    {
        "pergunta": "A governança orientada a risco prioriza:",
        "opcoes": [
            "Orçamentos",
            "Ações com base em ameaças e vulnerabilidades",
            "Aumento de pessoal",
            "Compras emergenciais"
        ],
        "resposta": 1,
        "nivel": 4
    },
    {
        "pergunta": "O PETIC tem como função:",
        "opcoes": [
            "Fiscalizar redes",
            "Detalhar ações e metas de TIC",
            "Reduzir contratos",
            "Contratar servidores"
        ],
        "resposta": 1,
        "nivel": 4
    },
    {
        "pergunta": "O que é não permitido na elaboração do PEDTIC?",
        "opcoes": [
            "Alinhamento com o PEI",
            "Uso de metas governamentais",
            "Desvinculação das diretrizes da Portaria 825",
            "Participação da área técnica"
        ],
        "resposta": 2,
        "nivel": 4
    },
    {
        "pergunta": "Qual ação pode ser adotada para reduzir riscos em privacidade?",
        "opcoes": [
            "Divulgação de dados",
            "Avaliação de impacto e salvaguardas",
            "Acesso irrestrito",
            "Exposição dos sistemas"
        ],
        "resposta": 1,
        "nivel": 4
    },
    {
        "pergunta": "Responsável por dúvidas na elaboração do PEDTIC:",
        "opcoes": [
            "Auditoria Interna",
            "Diretoria de Assuntos Estratégicos",
            "Presidência",
            "Comitê de Ética"
        ],
        "resposta": 1,
        "nivel": 4
    },
    {
        "pergunta": "A proteção dos dados deve observar:",
        "opcoes": [
            "Exposição de resultados",
            "Apenas restrições contratuais",
            "LGPD e boas práticas de mercado",
            "Políticas setoriais apenas"
        ],
        "resposta": 2,
        "nivel": 4
    },
    {
        "pergunta": "Accountability em governança de dados significa:",
        "opcoes": [
            "Auditoria obrigatória",
            "Responsabilidade e transparência na gestão",
            "Controle de acesso físico",
            "Penalidade automática"
        ],
        "resposta": 1,
        "nivel": 5
    },
    {
        "pergunta": "Qualquer servidor pode ser incluído no Comitê desde que:",
        "opcoes": [
            "Haja autorização da chefia e justificativa",
            "Seja do setor de TI",
            "Tenha mais de 10 anos de carreira",
            "Seja designado por concurso"
        ],
        "resposta": 0,
        "nivel": 5
    },
    {
        "pergunta": "A gestão da informação deve seguir:",
        "opcoes": [
            "Critérios de urgência",
            "Princípios constitucionais e estratégicos",
            "Instruções da Receita",
            "Código Civil"
        ],
        "resposta": 1,
        "nivel": 5
    },
    {
        "pergunta": "A exclusão segura de dados deve:",
        "opcoes": [
            "Ser feita com base em achismos",
            "Ser imediata após o uso",
            "Obedecer normas da IN nº 02",
            "Ser feita apenas via hardware"
        ],
        "resposta": 2,
        "nivel": 5
    },
    {
        "pergunta": "A Portaria 871 estabelece que suplentes do Comitê devem:",
        "opcoes": [
            "Ser do mesmo setor, preferencialmente",
            "Ser justificados e autorizados pela chefia, se externos",
            "Ser indicados por votação",
            "Ter curso superior em TI"
        ],
        "resposta": 1,
        "nivel": 5
    }
];
