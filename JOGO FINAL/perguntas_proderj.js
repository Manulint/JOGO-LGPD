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
        "nivel": 1,
        "explicacao": "A Portaria 825 institui a Política, a Estratégia e as Normas da Governança de TIC no âmbito do PRODERJ."
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
        "nivel": 1,
        "explicacao": "O objetivo da estratégia é promover valor público por meio da boa governança digital, e não gerar receita ou tratar de temas alheios à TIC."
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
        "nivel": 1,
        "explicacao": "A transparência é um dos princípios que orientam a Governança de TIC no setor público."
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
        "nivel": 1,
        "explicacao": "O Plano Estratégico de TIC deve estar alinhado ao PEI (Planejamento Estratégico Institucional), garantindo que a TI apoie os objetivos da instituição."
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
        "nivel": 1,
        "explicacao": "É a Política da Governança de TIC que estabelece a missão e a visão que direcionam as ações de tecnologia."
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
        "nivel": 2,
        "explicacao": "O comitê existe para zelar pela conformidade da instituição com a LGPD (Lei Geral de Proteção de Dados)."
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
        "nivel": 2,
        "explicacao": "A coordenação do Comitê de Dados cabe à Vice-Presidência de Governo Digital."
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
        "nivel": 2,
        "explicacao": "O comitê é composto pela Diretoria Executiva e pelas Comissões Temáticas, responsáveis por conduzir e detalhar os temas de proteção de dados."
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
        "nivel": 2,
        "explicacao": "A LGPD é a principal base legal que fundamenta a atuação do comitê."
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
        "nivel": 2,
        "explicacao": "Entre suas atribuições está propor ações que levem a instituição à conformidade com a LGPD."
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
        "nivel": 3,
        "explicacao": "O PDCA (Plan-Do-Check-Act / Planejar-Fazer-Checar-Agir) é o ciclo usado para a melhoria contínua da segurança da informação."
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
        "nivel": 3,
        "explicacao": "A confidencialidade é um dos pilares da segurança da informação, ao lado da integridade e da disponibilidade."
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
        "nivel": 3,
        "explicacao": "A IN nº 02 abrange dados organizacionais, pessoais e físicos — e não apenas um tipo específico de informação."
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
        "nivel": 3,
        "explicacao": "Ativo de informação é qualquer recurso que processa, armazena ou transmite dados — pode ser sistema, equipamento, pessoa ou processo."
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
        "nivel": 3,
        "explicacao": "Compartilhar senhas com terceiros é vedado, pois a senha é individual e intransferível."
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
        "nivel": 4,
        "explicacao": "Não-repúdio é a garantia de que quem realizou uma ação não consegue negar sua autoria."
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
        "nivel": 4,
        "explicacao": "A norma deve ser revista periodicamente ou sempre que ocorrerem eventos relevantes que justifiquem a atualização."
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
        "nivel": 4,
        "explicacao": "As Comissões Temáticas são criadas para aprofundar temas específicos de proteção de dados."
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
        "nivel": 4,
        "explicacao": "A segurança da informação é responsabilidade de todos que têm acesso aos ativos, e não apenas da equipe de TI ou das chefias."
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
        "nivel": 4,
        "explicacao": "A governança orientada a risco prioriza ações a partir da análise de ameaças e vulnerabilidades."
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
        "nivel": 4,
        "explicacao": "O PETIC (Plano Estratégico de TIC) detalha as ações e metas de tecnologia da informação e comunicação."
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
        "nivel": 4,
        "explicacao": "Não é permitido desvincular o PEDTIC das diretrizes da Portaria 825 — ele deve seguir essas orientações."
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
        "nivel": 4,
        "explicacao": "Fazer avaliação de impacto e adotar salvaguardas são medidas que reduzem riscos à privacidade."
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
        "nivel": 4,
        "explicacao": "A Diretoria de Assuntos Estratégicos é a responsável por esclarecer dúvidas na elaboração do PEDTIC."
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
        "nivel": 4,
        "explicacao": "A proteção de dados deve observar a LGPD e as boas práticas de mercado, indo além de restrições contratuais ou setoriais."
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
        "nivel": 5,
        "explicacao": "Accountability é o dever de prestar contas: responsabilidade e transparência na gestão dos dados."
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
        "nivel": 5,
        "explicacao": "A inclusão depende de autorização da chefia e de justificativa, não de setor, tempo de carreira ou concurso."
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
        "nivel": 5,
        "explicacao": "A gestão da informação deve seguir princípios constitucionais e estratégicos, e não apenas critérios de urgência."
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
        "nivel": 5,
        "explicacao": "A exclusão segura de dados deve obedecer às normas estabelecidas pela IN nº 02."
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
        "nivel": 5,
        "explicacao": "Pela Portaria 871, suplentes externos ao setor devem ser justificados e autorizados pela chefia."
    }
];
