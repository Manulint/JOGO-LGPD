// Perguntas sobre a LGPD (Lei nº 13.709/2018) com dificuldade progressiva.
// Campos: pergunta, opcoes, resposta (índice da correta), nivel (1-5), explicacao.
const perguntasProderj = [
    // ----------------------- NÍVEL 1 (fundamentos) -----------------------
    {
        "pergunta": "A LGPD regula principalmente:",
        "opcoes": [
            "A segurança de redes e sistemas de TI",
            "O tratamento de dados pessoais",
            "Os crimes cibernéticos",
            "O acesso à informação pública"
        ],
        "resposta": 1,
        "nivel": 1,
        "explicacao": "A LGPD cuida do tratamento de dados pessoais. Segurança de redes, crimes cibernéticos e acesso à informação pública são temas de outras normas."
    },
    {
        "pergunta": "Segundo a LGPD, dado pessoal é:",
        "opcoes": [
            "Qualquer informação considerada sigilosa",
            "Informação relacionada a pessoa natural identificada ou identificável",
            "Apenas documentos como CPF, RG e passaporte",
            "Toda informação guardada em um sistema"
        ],
        "resposta": 1,
        "nivel": 1,
        "explicacao": "O ponto-chave é 'identificável': um dado que, sozinho ou combinado com outros, permita chegar à pessoa (como um IP) também é pessoal."
    },
    {
        "pergunta": "Qual destas alternativas NÃO é um dado pessoal?",
        "opcoes": [
            "O e-mail de um cliente",
            "A geolocalização de um usuário",
            "O CNPJ e o faturamento de uma empresa",
            "A placa vinculada ao carro de uma pessoa"
        ],
        "resposta": 2,
        "nivel": 1,
        "explicacao": "Dados de pessoa jurídica (CNPJ, faturamento) não são dados pessoais. Já e-mail, geolocalização e placa ligada a alguém identificam uma pessoa natural."
    },
    {
        "pergunta": "O 'titular' dos dados é:",
        "opcoes": [
            "Quem coleta e decide sobre os dados",
            "A pessoa natural a quem os dados se referem",
            "O encarregado pela proteção de dados",
            "A autoridade que fiscaliza a lei"
        ],
        "resposta": 1,
        "nivel": 1,
        "explicacao": "O titular é a pessoa a quem os dados dizem respeito. As demais opções descrevem o controlador, o encarregado e a ANPD."
    },
    {
        "pergunta": "A LGPD se aplica:",
        "opcoes": [
            "Apenas a empresas privadas",
            "Apenas a órgãos públicos",
            "Tanto a empresas privadas quanto a órgãos públicos",
            "Apenas a empresas com mais de 100 funcionários"
        ],
        "resposta": 2,
        "nivel": 1,
        "explicacao": "A lei alcança o setor privado e o público, independentemente do porte da organização."
    },
    {
        "pergunta": "O que a LGPD entende por 'tratamento' de dados?",
        "opcoes": [
            "Apenas a coleta dos dados",
            "Apenas o armazenamento em banco de dados",
            "Quase toda operação: coleta, uso, armazenamento, compartilhamento e eliminação",
            "Somente a venda de dados a terceiros"
        ],
        "resposta": 2,
        "nivel": 1,
        "explicacao": "'Tratamento' é amplo: abrange praticamente tudo o que se faz com o dado, do início ao fim do seu ciclo de vida."
    },

    // ----------------------- NÍVEL 2 (dados sensíveis e agentes) -----------------------
    {
        "pergunta": "São exemplos de dados pessoais SENSÍVEIS:",
        "opcoes": [
            "Nome completo e endereço",
            "Dado biométrico e informação sobre saúde",
            "CPF e número de telefone",
            "Histórico de compras online"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "Sensíveis são os que podem gerar discriminação (saúde, biometria, religião, etc.). Os demais são dados pessoais comuns."
    },
    {
        "pergunta": "Qual destes NÃO é um dado sensível?",
        "opcoes": [
            "Convicção religiosa",
            "Opinião política",
            "Endereço de e-mail",
            "Filiação a sindicato"
        ],
        "resposta": 2,
        "nivel": 2,
        "explicacao": "E-mail é dado pessoal comum. Convicção religiosa, opinião política e filiação sindical são sensíveis."
    },
    {
        "pergunta": "Uma empresa contrata um sistema de folha de pagamento na nuvem: ela define por que e como os dados serão usados, e o sistema apenas processa. Nesse caso:",
        "opcoes": [
            "Ambos são controladores",
            "A empresa é a controladora e o sistema é o operador",
            "O sistema é o controlador e a empresa é a operadora",
            "Ambos são apenas operadores"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "Quem decide as finalidades é o controlador (a empresa); quem trata os dados seguindo instruções é o operador (o sistema contratado)."
    },
    {
        "pergunta": "Sobre o encarregado (DPO), é correto dizer que:",
        "opcoes": [
            "É obrigatoriamente um advogado",
            "É sempre um funcionário do setor de TI",
            "É a pessoa ou entidade que atua como canal entre a organização, os titulares e a ANPD",
            "É indicado diretamente pela ANPD"
        ],
        "resposta": 2,
        "nivel": 2,
        "explicacao": "O encarregado pode ser pessoa ou entidade e funciona como ponte entre a organização, os titulares e a ANPD — não precisa ser advogado nem de TI."
    },
    {
        "pergunta": "A ANPD é responsável por:",
        "opcoes": [
            "Julgar criminalmente os responsáveis por vazamentos",
            "Fiscalizar, orientar e aplicar sanções relativas à LGPD",
            "Autorizar previamente toda coleta de dados",
            "Representar os titulares em ações judiciais"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "A ANPD fiscaliza, orienta e sanciona administrativamente. Ela não julga crimes (isso é do Judiciário) nem autoriza cada coleta."
    },
    {
        "pergunta": "Em relação aos dados comuns, os dados sensíveis:",
        "opcoes": [
            "Podem ser tratados livremente",
            "Têm regras de tratamento mais rígidas",
            "Não podem jamais ser tratados",
            "Só existem no setor público"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "Não é proibição total: os sensíveis exigem bases legais específicas e cuidados reforçados por causa do risco de discriminação."
    },

    // ----------------------- NÍVEL 3 (consentimento, bases legais, princípios) -----------------------
    {
        "pergunta": "O consentimento previsto na LGPD deve ser:",
        "opcoes": [
            "Genérico, cobrindo qualquer uso futuro",
            "Livre, informado, inequívoco e para finalidade específica",
            "Obtido uma única vez, valendo para sempre",
            "Presumido quando o titular não se manifesta"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "Consentimento genérico e o silêncio do titular não valem. Ele precisa ser específico, livre, informado e inequívoco."
    },
    {
        "pergunta": "Sobre as bases legais para tratar dados, é correto afirmar:",
        "opcoes": [
            "O consentimento é sempre obrigatório",
            "O consentimento é apenas uma entre várias bases legais",
            "O legítimo interesse dispensa qualquer cuidado",
            "Órgãos públicos não precisam de base legal"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "A LGPD traz várias bases (obrigação legal, execução de contrato, legítimo interesse, políticas públicas, etc.). O consentimento é só uma delas."
    },
    {
        "pergunta": "Uma loja coletou dados para fazer entregas e passou a usá-los para enviar propaganda não autorizada. Que princípio foi violado?",
        "opcoes": [
            "Segurança",
            "Finalidade",
            "Portabilidade",
            "Não discriminação"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "Usar o dado para um fim diferente do que foi informado viola a finalidade. (Portabilidade, aliás, é um direito do titular, não um princípio.)"
    },
    {
        "pergunta": "Coletar mais dados do que o necessário para a finalidade contraria o princípio da:",
        "opcoes": [
            "Necessidade (minimização)",
            "Transparência",
            "Livre acesso",
            "Responsabilização"
        ],
        "resposta": 0,
        "nivel": 3,
        "explicacao": "A minimização exige coletar apenas o estritamente necessário para a finalidade pretendida."
    },
    {
        "pergunta": "Sobre a base legal do 'legítimo interesse', é correto afirmar:",
        "opcoes": [
            "Autoriza qualquer uso que gere lucro à empresa",
            "Permite o tratamento desde que não prevaleçam os direitos e liberdades do titular",
            "Dispensa qualquer avaliação ou registro",
            "Serve inclusive para dados sensíveis"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "O legítimo interesse exige um balanceamento: não pode passar por cima dos direitos do titular, e não se aplica a dados sensíveis."
    },
    {
        "pergunta": "O princípio da transparência garante ao titular:",
        "opcoes": [
            "O direito de acessar dados de terceiros",
            "Informações claras e acessíveis sobre o tratamento dos seus dados",
            "A remoção automática dos dados após 30 dias",
            "O anonimato em qualquer situação"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "Transparência é dar ao titular informação clara sobre como e por que seus dados são tratados, e por quem."
    },

    // ----------------------- NÍVEL 4 (direitos, crianças, incidentes, anonimização) -----------------------
    {
        "pergunta": "Qual destes NÃO é um direito do titular previsto na LGPD?",
        "opcoes": [
            "Solicitar a portabilidade dos dados",
            "Confirmar a existência de tratamento",
            "Impedir que a empresa cumpra uma obrigação legal de guarda",
            "Revogar o consentimento"
        ],
        "resposta": 2,
        "nivel": 4,
        "explicacao": "O titular tem muitos direitos, mas não pode impedir tratamentos que a lei exige (por exemplo, a guarda de notas fiscais)."
    },
    {
        "pergunta": "Um pedido de eliminação feito pelo titular pode ser negado quando:",
        "opcoes": [
            "A empresa considerar os dados úteis para marketing",
            "A lei exigir a guarda dos dados (obrigação legal ou regulatória)",
            "O titular não pagar uma taxa",
            "Nunca pode ser negado"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Certos dados devem ser mantidos por obrigação legal, mesmo diante de um pedido de exclusão. 'Interesse de marketing' não justifica manter."
    },
    {
        "pergunta": "No tratamento de dados de crianças e adolescentes:",
        "opcoes": [
            "É proibido em qualquer hipótese",
            "Prevalece o melhor interesse, com consentimento específico de um dos pais ou responsável para crianças",
            "Basta o consentimento da própria criança",
            "Aplica-se somente a menores de 8 anos"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "O tratamento deve atender ao melhor interesse e, para crianças, exige consentimento específico e destacado de um dos pais ou responsável."
    },
    {
        "pergunta": "Após um incidente de segurança que possa gerar risco relevante aos titulares, o controlador deve comunicar:",
        "opcoes": [
            "Apenas internamente, à diretoria",
            "À ANPD e aos titulares afetados, em prazo razoável",
            "Somente à polícia",
            "A ninguém, se resolver o problema rapidamente"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Incidentes com risco ou dano relevante devem ser comunicados à ANPD e aos titulares afetados, em prazo razoável."
    },
    {
        "pergunta": "A diferença entre anonimização e pseudonimização é que:",
        "opcoes": [
            "São exatamente a mesma coisa",
            "A anonimização é irreversível; a pseudonimização pode ser revertida com informação adicional",
            "A pseudonimização apaga os dados e a anonimização os criptografa",
            "Apenas a anonimização é prevista em lei"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Dado anonimizado, em regra, não é mais pessoal. Já o pseudonimizado pode ser reidentificado com uma informação extra — por isso continua protegido."
    },
    {
        "pergunta": "Substituir o nome por um código, mas guardar a tabela que liga o código à pessoa (pseudonimização), significa que o dado:",
        "opcoes": [
            "Deixa de ser dado pessoal",
            "Ainda é considerado dado pessoal",
            "Torna-se automaticamente sensível",
            "Passa a ser um dado público"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Como a reidentificação é possível (existe a tabela de correspondência), o dado pseudonimizado continua sendo pessoal e protegido pela LGPD."
    },

    // ----------------------- NÍVEL 5 (sanções, RIPD, transferência, accountability) -----------------------
    {
        "pergunta": "Uma das sanções administrativas da LGPD é a multa simples de até:",
        "opcoes": [
            "10% do faturamento, sem limite de valor",
            "2% do faturamento, limitada a R$ 50 milhões por infração",
            "R$ 1.000 por titular afetado",
            "20% do faturamento anual"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "A multa simples é de até 2% do faturamento da empresa no Brasil, limitada a R$ 50 milhões por infração."
    },
    {
        "pergunta": "Além da multa, a ANPD pode aplicar sanções como:",
        "opcoes": [
            "Prisão dos responsáveis",
            "Advertência, bloqueio e eliminação dos dados envolvidos",
            "Cassação automática do CNPJ",
            "Apreensão de bens dos sócios"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "As sanções da LGPD são administrativas (advertência, bloqueio, eliminação, publicização, etc.) — não incluem prisão."
    },
    {
        "pergunta": "O Relatório de Impacto à Proteção de Dados (RIPD) é especialmente importante quando:",
        "opcoes": [
            "A empresa quer aumentar as vendas",
            "O tratamento pode gerar riscos às liberdades e aos direitos dos titulares",
            "Há necessidade de contratar mais funcionários",
            "A empresa vai encerrar suas atividades"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "O RIPD descreve os tratamentos que podem gerar riscos aos titulares e as medidas adotadas para mitigá-los."
    },
    {
        "pergunta": "A transferência internacional de dados é permitida, entre outras hipóteses, quando:",
        "opcoes": [
            "A empresa simplesmente decide enviar os dados",
            "O país de destino oferece grau de proteção adequado ou há garantias e cláusulas contratuais específicas",
            "O destino for qualquer país da América do Sul",
            "É proibida em qualquer caso"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "A transferência exige salvaguardas: país com proteção adequada, cláusulas-padrão, consentimento específico ou outras hipóteses da lei."
    },
    {
        "pergunta": "O princípio da responsabilização e prestação de contas (accountability) exige que o agente:",
        "opcoes": [
            "Apenas tenha um contrato assinado",
            "Demonstre a adoção de medidas eficazes de proteção de dados",
            "Guarde os dados por tempo indeterminado",
            "Transfira a responsabilidade ao titular"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "Não basta cumprir a lei: é preciso conseguir comprovar que se adotam medidas eficazes de proteção."
    },
    {
        "pergunta": "Encerrada a finalidade do tratamento, a LGPD determina, em regra:",
        "opcoes": [
            "A venda dos dados para recuperar custos",
            "A eliminação dos dados, ressalvadas as hipóteses legais de conservação",
            "A manutenção permanente por segurança",
            "A publicação dos dados por transparência"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "Cumprida a finalidade, os dados devem ser eliminados, salvo quando a lei autorizar a guarda (obrigação legal, exercício de direitos, etc.)."
    }
];
