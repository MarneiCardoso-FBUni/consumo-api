// Guarda o formulário e o botão Buscar
const form = document.getElementById("formCep");

// Cria um listener (ouvinte) do clique do botão
form.btnBuscar.addEventListener("click", () => {
    buscarCEP(form.cep.value);
});

// Função Anônima (equivalente a Arrow function acima)
// btnBuscar.addEventListener("click", function() {});

function buscarCEP(cepInformado) {
    // Verifica se o CEP é válido
    if (cepInformado == "" || cepInformado.length != 8) {
        alert("CEP inválido!");
        form.cep.focus();
        return; // Sai da função
    }

    // Cria a URL
    const url = `https://viacep.com.br/ws/${cepInformado}/json/`;

    // Envia o CEP informado para a API
    fetch(url)
        // Se a resposta for bem sucedida, converte para JSON
        .then(response => response.json())

        // Preenche os campos do formulário
        .then(dados => {
            console.log(dados);
            
            form.logradouro.value = dados.logradouro;
            form.bairro.value = dados.bairro;
            form.cidade.value = dados.localidade;
            form.estado.value = dados.estado;

            form.numero.focus();
        })
        .catch(error => {
            alert("CEP não encontrado!");
            log(error);
        });
}
