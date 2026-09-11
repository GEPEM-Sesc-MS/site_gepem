/* EDITE ESTE ARQUIVO para personalizar o portal.
   Não cole a tag <iframe> inteira: copie somente o endereço entre aspas do src.
   URL vazia = painel em preparação. A ordem dos objetos é a ordem do menu. */
window.OBSERVATORIO = {
  marca: {
    nome: "Inteligência de Mercado - ",
    sigla: "Sistema Comércio MS",
    subtitulo: "Comércio, serviços e turismo",
    selo: "",
    rodape: "",
    logo: "" // Opcional: "assets/logo.png". Copie a imagem para essa pasta.
  },
  painelInicial: "interiorizacao",
  grupos: [
    {
      titulo: "Interiorização",
      paineis: [
        {
          id: "interiorizacao", // Identificador único, sem espaços ou acentos.
          titulo: "Mapa de Interiorização",
          descricao: "Estrutura produtiva e mercado de trabalho de Mato Grosso do Sul.",
          // TROQUE AQUI pelo src do SEU relatório do Power BI.
          url: "https://app.powerbi.com/view?r=eyJrIjoiODg1NTVkMjgtYjdjOC00Yzg3LWJlNzUtY2YyM2NjMzRiYTkzIiwidCI6IjlhODE4OTVjLWE0MGItNGZlYS1iMDAzLTg3Mzc2NDE2MDViYyJ9",
          fonte: "Controles de Interiorização - Sesc MS",
          nota: "Relatório público da FIEMS incorporado como referência. O conteúdo é de responsabilidade da instituição de origem. Substitua pelo seu relatório antes da apresentação institucional.",
        }
      ]
    },
    {
      titulo: "Radar do Cliente",
      paineis: [
        { id: "perfil", titulo: "Perfil do Cliente", descricao: "Empresas, empregos e dinâmica do comércio em Mato Grosso do Sul.", url: "https://app.powerbi.com/view?r=eyJrIjoiYjM1ZTlkYzItZmRiZC00MzJhLThiZDgtMThiNzlmZjRkOWE1IiwidCI6IjlhODE4OTVjLWE0MGItNGZlYS1iMDAzLTg3Mzc2NDE2MDViYyJ9", fonte: "", nota: "" },
        { id: "nps", titulo: "Painel de Satisfação", descricao: "Estrutura e evolução do setor de serviços.", url: "https://app.powerbi.com/view?r=eyJrIjoiMzJhYmEyMGYtZjUzNS00OWMxLWE2ZmQtN2RmNmMzMjIzNGNjIiwidCI6IjlhODE4OTVjLWE0MGItNGZlYS1iMDAzLTg3Mzc2NDE2MDViYyJ9", fonte: "", nota: "" }
      ]
    },
    {
      titulo: "Comercialização",
      paineis: [
        { id: "empresas", titulo: "Mapa de Empresas", descricao: "Admissões, desligamentos e evolução do emprego formal.", url: "https://app.powerbi.com/view?r=eyJrIjoiOWE4NTg2NmEtYzg2NS00OWZmLTk3MWUtNDM4ZTlhODA5MmNlIiwidCI6IjlhODE4OTVjLWE0MGItNGZlYS1iMDAzLTg3Mzc2NDE2MDViYyJ9", fonte: "", nota: "" }        
      ]
    }
  ]
};
