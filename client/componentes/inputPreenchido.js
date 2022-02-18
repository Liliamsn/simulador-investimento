const botao = document.querySelector(".simular");
const inputs = document.querySelectorAll("input");

//Função para verificar se todos os campos estão preenchidos
function inputOK(inputs) {
    var valores = true;
    
    
    inputs.forEach((input)=> {
        
        if(input.value === '') {
            valores = false;
        }
    })
    
    return valores;
}

inputs.forEach((input)=> {

    //Percorrendo por todos os eventos captados de keyup
    
    input.addEventListener("keyup",()=> {

        //Chamando a função inputOk com o valor do dado armazenado em valores. Se falso, o botão não é acionado
        if(inputOK(inputs)) {
            botao.classList.add("simular-dados");
        } else {
            botao.classList.add("simular");
        }
    })
})
