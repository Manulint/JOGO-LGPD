// Perguntas sobre a LGPD (Lei nº 13.709/2018) com dificuldade progressiva.
// Campos: pergunta, opcoes, resposta (índice da correta), nivel (1-5), explicacao.
const perguntasProderj = [
    // ----------------------- NÍVEL 1 (conceitos básicos) -----------------------
    {
        "pergunta": "O que significa a sigla LGPD?",
        "opcoes": [
            "Lei Geral de Proteção de Dados",
            "Lei de Governança e Privacidade Digital",
            "Legislação Geral de Proteção Digital",
            "Lei de Gestão de Dados Públicos"
        ],
        "resposta": 0,
        "nivel": 1,
        "explicacao": "LGPD é a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), que regula o tratamento de dados pessoais no Brasil."
    },
    {
        "pergunta": "Qual é o principal objetivo da LGPD?",
        "opcoes": [
            "Regular o comércio eletrônico",
            "Proteger os dados pessoais e a privacidade das pessoas",
            "Combater apenas crimes cibernéticos",
            "Fiscalizar empresas de tecnologia"
        ],
        "resposta": 1,
        "nivel": 1,
        "explicacao": "A LGPD existe para proteger os direitos fundamentais de liberdade, privacidade e a proteção dos dados pessoais das pessoas."
    },
    {
        "pergunta": "Segundo a LGPD, o que é um 'dado pessoal'?",
        "opcoes": [
            "Qualquer informação de uma empresa",
            "Apenas o CPF e o RG",
            "Informação relacionada a uma pessoa natural identificada ou identificável",
            "Somente dados bancários"
        ],
        "resposta": 2,
        "nivel": 1,
        "explicacao": "Dado pessoal é toda informação relacionada a uma pessoa natural identificada ou identificável — como nome, CPF, e-mail ou até um endereço IP."
    },
    {
        "pergunta": "Quem é o 'titular' dos dados?",
        "opcoes": [
            "A empresa que coleta os dados",
            "A pessoa natural a quem os dados se referem",
            "O governo",
            "O setor de TI"
        ],
        "resposta": 1,
        "nivel": 1,
        "explicacao": "O titular é a pessoa natural a quem os dados pessoais dizem respeito. É ela quem detém os direitos previstos na lei."
    },
    {
        "pergunta": "A LGPD se aplica a quem?",
        "opcoes": [
            "Apenas grandes empresas",
            "Apenas órgãos públicos",
            "Apenas empresas de tecnologia",
            "Pessoas físicas e jurídicas, de direito público e privado"
        ],
        "resposta": 3,
        "nivel": 1,
        "explicacao": "A LGPD alcança qualquer tratamento de dados feito por pessoa física ou jurídica, seja de direito público ou privado, com poucas exceções."
    },
    {
        "pergunta": "Qual destes é um exemplo de dado pessoal?",
        "opcoes": [
            "Nome, CPF e e-mail de uma pessoa",
            "O CNPJ de uma empresa",
            "Dados sobre o clima",
            "O faturamento de uma loja"
        ],
        "resposta": 0,
        "nivel": 1,
        "explicacao": "Nome, CPF e e-mail identificam uma pessoa natural, portanto são dados pessoais. Informações de empresas ou dados gerais não são dados pessoais."
    },

    // ----------------------- NÍVEL 2 (dados sensíveis e agentes) -----------------------
    {
        "pergunta": "O que são dados pessoais SENSÍVEIS?",
        "opcoes": [
            "Dados que a pessoa considera secretos",
            "Apenas senhas e dados bancários",
            "Dados sobre origem racial, religião, saúde, vida sexual ou opinião política",
            "Qualquer dado de menores de idade"
        ],
        "resposta": 2,
        "nivel": 2,
        "explicacao": "Dados sensíveis são os que podem gerar discriminação: origem racial/étnica, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico. Recebem proteção reforçada."
    },
    {
        "pergunta": "Qual destes é um dado pessoal sensível?",
        "opcoes": [
            "Endereço residencial",
            "Número de telefone",
            "Informação sobre a saúde de uma pessoa",
            "Data de nascimento"
        ],
        "resposta": 2,
        "nivel": 2,
        "explicacao": "Dados de saúde são sensíveis. Endereço, telefone e data de nascimento são dados pessoais comuns, sem a proteção reforçada dos sensíveis."
    },
    {
        "pergunta": "Quem é o 'controlador' na LGPD?",
        "opcoes": [
            "Quem apenas armazena os dados",
            "Quem toma as decisões sobre o tratamento dos dados",
            "O titular dos dados",
            "A ANPD"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "O controlador é quem decide como e por que os dados serão tratados (define as finalidades e os meios do tratamento)."
    },
    {
        "pergunta": "Quem é o 'operador' na LGPD?",
        "opcoes": [
            "Quem define as finalidades do tratamento",
            "Quem realiza o tratamento em nome do controlador",
            "O dono da empresa",
            "O titular dos dados"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "O operador trata os dados seguindo as instruções do controlador — por exemplo, uma empresa contratada para processar dados em nome de outra."
    },
    {
        "pergunta": "Qual a função do 'encarregado' (DPO)?",
        "opcoes": [
            "Fiscalizar contratos da empresa",
            "Aprovar orçamentos de TI",
            "Ser o canal de comunicação entre o controlador, os titulares e a ANPD",
            "Julgar processos administrativos"
        ],
        "resposta": 2,
        "nivel": 2,
        "explicacao": "O encarregado (Data Protection Officer) é a ponte entre a organização, os titulares dos dados e a ANPD, além de orientar sobre boas práticas."
    },
    {
        "pergunta": "O que é a ANPD?",
        "opcoes": [
            "Agência Nacional de Proteção Digital",
            "Autoridade Nacional de Proteção de Dados",
            "Associação Nacional de Privacidade de Dados",
            "Autarquia Nacional de Dados Públicos"
        ],
        "resposta": 1,
        "nivel": 2,
        "explicacao": "A ANPD (Autoridade Nacional de Proteção de Dados) é o órgão responsável por fiscalizar, orientar e aplicar a LGPD no Brasil."
    },

    // ----------------------- NÍVEL 3 (consentimento, princípios, bases legais) -----------------------
    {
        "pergunta": "O consentimento do titular deve ser:",
        "opcoes": [
            "Livre, informado e inequívoco",
            "Verbal e informal",
            "Permanente e irrevogável",
            "Presumido pelo silêncio do titular"
        ],
        "resposta": 0,
        "nivel": 3,
        "explicacao": "O consentimento precisa ser livre, informado e inequívoco, dado para finalidades específicas. Silêncio ou consentimento genérico não valem."
    },
    {
        "pergunta": "O titular pode revogar o consentimento que deu?",
        "opcoes": [
            "Não, o consentimento é definitivo",
            "Sim, a qualquer momento, de forma facilitada e gratuita",
            "Apenas com autorização judicial",
            "Somente após um ano"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "A revogação do consentimento é um direito do titular e pode ser feita a qualquer momento, de maneira fácil e gratuita."
    },
    {
        "pergunta": "O princípio da FINALIDADE determina que os dados sejam tratados:",
        "opcoes": [
            "Para qualquer propósito da empresa",
            "Para propósitos legítimos, específicos e informados ao titular",
            "Somente para fins comerciais",
            "Sem necessidade de informar o titular"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "Pelo princípio da finalidade, os dados só podem ser usados para propósitos legítimos, específicos e informados ao titular — não para fins diferentes depois."
    },
    {
        "pergunta": "O princípio da NECESSIDADE (minimização) diz que se deve coletar:",
        "opcoes": [
            "O máximo de dados possível",
            "Apenas os dados mínimos necessários para a finalidade",
            "Todos os dados disponíveis do titular",
            "Somente dados sensíveis"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "A minimização exige coletar apenas os dados estritamente necessários para atingir a finalidade — nada além do preciso."
    },
    {
        "pergunta": "O consentimento é a ÚNICA forma de se poder tratar dados pessoais?",
        "opcoes": [
            "Sim, sempre é preciso consentimento",
            "Não; há outras bases legais, como obrigação legal e legítimo interesse",
            "Sim, exceto para o governo",
            "Apenas para dados sensíveis"
        ],
        "resposta": 1,
        "nivel": 3,
        "explicacao": "A LGPD prevê várias bases legais além do consentimento, como cumprimento de obrigação legal, execução de contrato e legítimo interesse."
    },
    {
        "pergunta": "Tratar dados pessoais sem nenhuma base legal prevista na LGPD é:",
        "opcoes": [
            "Permitido se for rápido",
            "Permitido para empresas pequenas",
            "Irregular e sujeito a sanções",
            "Permitido com um aviso verbal"
        ],
        "resposta": 2,
        "nivel": 3,
        "explicacao": "Todo tratamento precisa se apoiar em uma base legal. Sem isso, é irregular e pode gerar sanções da ANPD."
    },

    // ----------------------- NÍVEL 4 (direitos, crianças, incidentes, anonimização) -----------------------
    {
        "pergunta": "Qual destes é um direito do titular dos dados?",
        "opcoes": [
            "Vender os dados de terceiros",
            "Solicitar acesso, correção e eliminação dos seus dados",
            "Alterar os dados de outras pessoas",
            "Definir a política interna da empresa"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "O titular pode, entre outros, confirmar a existência do tratamento, acessar, corrigir, solicitar a eliminação e a portabilidade dos seus dados."
    },
    {
        "pergunta": "O direito à PORTABILIDADE permite ao titular:",
        "opcoes": [
            "Apagar todos os dados da internet",
            "Transferir seus dados a outro fornecedor de serviço",
            "Copiar dados de outras pessoas",
            "Vender seus próprios dados"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "A portabilidade permite ao titular levar seus dados de um fornecedor para outro, mediante requisição, respeitados os segredos comercial e industrial."
    },
    {
        "pergunta": "O tratamento de dados de CRIANÇAS deve ser feito:",
        "opcoes": [
            "Livremente, sem restrições",
            "No melhor interesse da criança e com consentimento de um dos pais ou responsável",
            "Apenas com autorização da escola",
            "Somente para maiores de 12 anos"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Dados de crianças exigem cuidado especial: devem ser tratados no melhor interesse dela e, em regra, com consentimento específico de um dos pais ou responsável."
    },
    {
        "pergunta": "Diante de um vazamento (incidente) que possa gerar risco aos titulares, o controlador deve:",
        "opcoes": [
            "Ignorar se for pequeno",
            "Resolver internamente sem avisar ninguém",
            "Comunicar à ANPD e aos titulares afetados",
            "Avisar apenas a imprensa"
        ],
        "resposta": 2,
        "nivel": 4,
        "explicacao": "Incidentes de segurança que possam acarretar risco ou dano relevante devem ser comunicados à ANPD e aos titulares afetados, em prazo razoável."
    },
    {
        "pergunta": "O que é ANONIMIZAÇÃO de dados?",
        "opcoes": [
            "Esconder os dados com uma senha",
            "Processo que impede a identificação do titular dos dados",
            "Apagar todos os dados de uma vez",
            "Criptografar os dados temporariamente"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Anonimizar é tratar o dado de modo que ele perca a possibilidade de associação a uma pessoa, por meios razoáveis. Difere da pseudonimização, que é reversível."
    },
    {
        "pergunta": "Um dado verdadeiramente anonimizado, em regra:",
        "opcoes": [
            "É sempre considerado sensível",
            "Não é considerado dado pessoal, enquanto não puder ser revertido",
            "Passa a ser um dado público",
            "Pertence ao operador"
        ],
        "resposta": 1,
        "nivel": 4,
        "explicacao": "Segundo a LGPD, o dado anonimizado não é dado pessoal — salvo se o processo puder ser revertido, permitindo reidentificar a pessoa."
    },

    // ----------------------- NÍVEL 5 (sanções, RIPD, transferência, avançado) -----------------------
    {
        "pergunta": "A fiscalização e a aplicação de sanções da LGPD cabem principalmente à:",
        "opcoes": [
            "Polícia Federal",
            "Receita Federal",
            "ANPD",
            "Apenas ao Ministério Público"
        ],
        "resposta": 2,
        "nivel": 5,
        "explicacao": "É a ANPD que fiscaliza o cumprimento da LGPD e aplica as sanções administrativas previstas na lei."
    },
    {
        "pergunta": "Uma das sanções administrativas previstas na LGPD é:",
        "opcoes": [
            "Prisão automática do responsável",
            "Multa de até 2% do faturamento, limitada a R$ 50 milhões por infração",
            "Fechamento imediato da empresa",
            "Apenas uma advertência verbal"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "Entre as sanções está a multa de até 2% do faturamento da empresa no Brasil, limitada a R$ 50 milhões por infração, além de advertência, bloqueio e eliminação de dados."
    },
    {
        "pergunta": "O Relatório de Impacto à Proteção de Dados (RIPD) serve para:",
        "opcoes": [
            "Registrar o faturamento da empresa",
            "Descrever os tratamentos e os riscos à privacidade, com medidas de mitigação",
            "Listar os funcionários da empresa",
            "Substituir o contrato de trabalho"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "O RIPD documenta os processos de tratamento de dados que podem gerar riscos, descrevendo esses riscos e as medidas adotadas para reduzi-los."
    },
    {
        "pergunta": "A transferência internacional de dados pessoais é permitida:",
        "opcoes": [
            "Nunca, em nenhuma hipótese",
            "Livremente, para qualquer país",
            "Em situações previstas na lei, como países com nível adequado de proteção",
            "Apenas para os Estados Unidos"
        ],
        "resposta": 2,
        "nivel": 5,
        "explicacao": "A LGPD permite a transferência internacional em hipóteses específicas — por exemplo, para países com grau adequado de proteção ou mediante garantias e cláusulas contratuais."
    },
    {
        "pergunta": "Quando a finalidade do tratamento acaba, os dados devem, em regra, ser:",
        "opcoes": [
            "Mantidos para sempre",
            "Eliminados, salvo hipóteses legais de conservação",
            "Vendidos a parceiros",
            "Publicados abertamente"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "Encerrada a finalidade, os dados devem ser eliminados, exceto quando a lei permitir a guarda (obrigação legal, estudo, exercício de direitos, etc.)."
    },
    {
        "pergunta": "O princípio da SEGURANÇA na LGPD exige que a organização adote:",
        "opcoes": [
            "Guardar dados apenas em papel",
            "Medidas técnicas e administrativas para proteger os dados",
            "Compartilhar dados livremente entre setores",
            "Não realizar cópias de segurança"
        ],
        "resposta": 1,
        "nivel": 5,
        "explicacao": "O princípio da segurança exige medidas técnicas e administrativas aptas a proteger os dados de acessos não autorizados, perdas, vazamentos ou destruição."
    }
];
