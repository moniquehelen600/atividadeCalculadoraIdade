// funcao principal
function calcularIdade(event) {                                                                               
    event.preventDefault()
    let dadosUsuario = pegarValores();

    let idade = calcular(dadosUsuario.dia,dadosUsuario.mes,dadosUsuario.ano);
   
    
    let classificacaoIdade = faixaEtaria(idade);

    let usuarioOrganizado = organizarDados(idade,classificacaoIdade,dadosUsuario)

    cadastrarUsuario(usuarioOrganizado);

    

}

// 1. Pegar os valores
function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let diaRecebido = parseFloat(document.getElementById("dia-nascimento").value);
    let mesRecebido = parseFloat(document.getElementById("mes-nascimento").value);
    let anoRecebido = parseFloat(document.getElementById("ano-nascimento").value);
    // objeto
    dadosUsuario={
        nome:nomeRecebido,                              
        dia:diaRecebido,
        mes:mesRecebido,
        ano:anoRecebido,
    } 
    return dadosUsuario
}

//2. Calcular a Idade
function calcular(dia,mes,ano) {
    let anoAtual = new Date().getFullYear();
    let mesAtual = new Date().getMonth();
    let diaAtual = new Date().getDay();

    let idade = anoAtual - ano 
     

    console.log(idade);

    return idade;
    }

//3. Gerar a faixa etária
function faixaEtaria(idade) {
// Resultado           Faixa            
// 0 à 12              Criança
// 13 à 17             Adolescente
// 18 à 65             Adulto
// Acima de 65         Idoso

    if (idade <= 12){
        return "crianca"
    }else if (idade <= 17) {
        return "Adolecente"
    }else if (idade <= 65) {
        return "Adulto"
    }else if (idade >=65) {
        return "Idoso"
    }
    
    
  }

// 4. Organizar o objeto pessoa para salvar na lista
function organizarDados (anos,classificacaoIdade,dadosUsuario) {
    let usuarioAtualizado = {
        ...dadosUsuario,
        idade:anos,
        faixaEtaria:classificacaoIdade,
        
        
    }
    return  usuarioAtualizado

}
    
//5 Cadastrar a pessoa na lista
function cadastrarUsuario(usuario){
    let listaUsuarios = [];

    if (localStorage.getItem("cadastroDeUsuarios")) {
        listaUsuarios = JSON.parse(localStorage.getItem("cadastroDeUsuarios"));
    }
    
    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados",JSON.stringify(listaUsuarios))
}

// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página

function carregaPessoas(){
    let listaUsuarios= [];

    if (localStorage.getItem("usuriosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuriosCadastrados"));
    }

    if (listaUsuarios.length ==0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">nenhum usuario Cadastrado!</td>
    </tr>`
    }else{
        montartabela(listaUsuarios)
    }
       
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
function montartabela(listaDecadastrados){
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    console.log(listaDecadastrados);

    listaDecadastrados.forEach(pessoa =>{
        templete +=     ` <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="data de nascimento">${pessoa.dia+mes+ano}</td>
        <td data-cell="idade">${pessoa.idade}</td>
        <td data-cell="faixa etária">${pessoa.faixaEtaria}</td>
    </tr> `   
        
    })

    tabela.innerHTML = template;

}
