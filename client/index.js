//Capturando os dados do formulário e guardando em váriaveis

const simular = document.querySelector(".simular");

const aporteInicial = document.querySelector("#aporte-inicial");
const labelAporteInicial = document.querySelector("#label-inicial");

const aporteMensal = document.querySelector("#aporte-mensal");
const labelAporteMensal = document.querySelector("#label-mensal");

const rentabilidade = document.querySelector("#rent");
const labelRentabilidade = document.querySelector("#label-rent");

const prazo = document.querySelector("#prazo");
const labelPrazo = document.querySelector("#label-prazo")

//Utilização do evento input ára captura dos valores
//Conversão dos dados inseridos para moeda e porcentagem

aporteInicial.addEventListener("input", (e)=> {

    //Armazendo os dados evento de input na variável value
    const value = e.target.value;
    
    //Uso do método replace com regex, para trocar qualquer letra por vazio
    const cleanValue = value.replace(/\D+/g, '')
    const options = { style: 'currency', currency: 'BRL' }

    //Utilizando o objeto Intl.NumberFormat para realizar a formatação do valor para real
    const novoValor = new Intl.NumberFormat('pt-br', options).format(cleanValue/100)
    e.target.value = novoValor;
    
});

aporteMensal.addEventListener("input", (e)=> {
    const value = e.target.value
    
    const cleanValue = value.replace(/\D+/g, '')
    const options = { style: 'currency', currency: 'BRL' }
    const novoValor = new Intl.NumberFormat('pt-br', options).format(cleanValue/100)
    e.target.value = novoValor
    
});


prazo.addEventListener("input", (e)=> {
    const value = e.target.value;
    const regex = /^[0-9]*$/
    
    //Utilizando regex para verificar se o valor inserido é um número
    if(regex.test(value) == true) {
        e.target.value = value
    } else if(/\w/.test(value) == true) {
        e.target.value = 0
    } 

});

rentabilidade.addEventListener("input", (e)=> {
    const value = e.target.value;

    const cleanValue = value.replace(/\D+/g, '')
    const novoValor = new Intl.NumberFormat('pt-br', {style: 'percent'}).format(cleanValue/100)
    e.target.value = novoValor;
});

simular.addEventListener("click", (evento)=> {
    //Previnindo o evento de propagação na página
    evento.preventDefault()
    
    //Abrindo a requisição
    var xhr = new XMLHttpRequest();
    
    //Requisição da api no localhost 3000
    xhr.open("GET", "http://localhost:3000/simulacoes");
    
    xhr.addEventListener("load", ()=> {
        
        
        var resposta = xhr.responseText;
        
        //Pegando a resposta da requisição e transformando em um objeto json
        var dado = JSON.parse(resposta);
        
        //coletando todos os inputs do tipo radio
        const tipoRendimento = document.querySelectorAll("input[type='radio']");

        //Criando uma lista par guardar a propriedade e o valor do objeto jason, no caso o dado
        const listaValores = document.querySelector(".resultado__valores")

        //Limpando a lista para que ao ser chamanda, não sobreponha os dados armazenados anteriormente
        listaValores.innerHTML = ''
        
        //Fazendo a verificação dos campos
        if((aporteInicial.value && aporteMensal.value && prazo.value && rentabilidade.value) == '') {
            
            if(aporteInicial.value == ''){

                var invalido = document.querySelector(".invalido-inicial");
                invalido.textContent = "Aporte deve ser preenchido";

                //Definindo um novo estilo caso o campo esteja vazio
                labelAporteInicial.setAttribute("style", "color: red");
                aporteInicial.setAttribute("style", "border-bottom: 1px solid red");
                invalido.classList.add("invalido"); 

            } else if(prazo.value == '') {

                var invalido = document.querySelector(".invalido-prazo");
                invalido.textContent = "Prazo deve ser preenchido";
                labelPrazo.setAttribute("style", "color: red");
                prazo.setAttribute("style", "border-bottom: 1px solid red");
                invalido.classList.add("invalido");

            } else if(aporteMensal.value == ''){

                var invalido = document.querySelector(".invalido-mensal");
                invalido.textContent = "Aporte deve ser preenchido";
                labelAporteMensal.setAttribute("style", "color: red");
                aporteMensal.setAttribute("style", "border-bottom: 1px solid red");
                invalido.classList.add("invalido");

            } else if(rentabilidade.value == '') {

                var invalido = document.querySelector(".invalido-rent");
                invalido.textContent = "Rentabilidade deve ser preenchido";
                labelRentabilidade.setAttribute("style", "color: red");
                rentabilidade.setAttribute("style", "border-bottom: 1px solid red");
                invalido.classList.add("invalido");

            }
            
        }else {

            //Verificando o status da requisição
            if(xhr.status == 200) {

                

                var invalido1 = document.querySelector(".invalido-inicial");
                labelAporteInicial.setAttribute("style", "color: black");
                aporteInicial.setAttribute("style", "border-bottom: 1px solid black");
                
                //Limpando o estilo dos campos vazios
                invalido1.innerHTML = '';


                var invalido2 = document.querySelector(".invalido-prazo");
                labelPrazo.setAttribute("style", "color: black");
                prazo.setAttribute("style", "border-bottom: 1px solid black");
                invalido2.innerHTML = '';


                var invalido3 = document.querySelector(".invalido-mensal");
                labelAporteMensal.setAttribute("style", "color: black");
                aporteMensal.setAttribute("style", "border-bottom: 1px solid black");
                invalido3.innerHTML = '';

                
                var invalido4 = document.querySelector(".invalido-rent");
                labelRentabilidade.setAttribute("style", "color: black");
                rentabilidade.setAttribute("style", "border-bottom: 1px solid black");
                invalido4.innerHTML = '';

                var resultado = document.querySelector(".resultado__subtitulo");
                resultado.textContent = "Resultado da Simulação";

                //Verificando os campos selecionados pelo usuário
                if(tipoRendimento[0].checked && tipoRendimento[2].checked) {
                    
                    //Guardando o objeto json dentro da variável valor
                    var valor = dado[0]
                    
                    //Rodando um loop for
                    for(val in valor) {

                        //Criando novas tags para armazenar os dados
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        const span = document.createElement("span");
                        

                        if(val == "valorPagoIR") {
                            val = "valorPagoEmIR";
                            valor[val] = 0;
                        }
                        
                        //Formatando os dados recebidos em real ou porcentagem
                        if(!(val == 'aliquotaIR')) {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'aliquotaIR') {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'percent', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'tipoIndexacao' || val == 'tipoRendimento' || val == 'graficoValores') {
                            
                        } else {
                            
                            const dado = val;

                            //Utilizando o método split para adicionar um espaço entre as letras maiúsculas
                            let novo = dado.split(/(?=[A-Z])/).join(" ");

                            /*Utilização do método (toUpperCase()) para trnsformação da primeira letra para maiúscula e do método de extração de string (substr())
                            para retirda da primeira letra*/

                            p.textContent = novo[0].toUpperCase() + novo.substr(1);


                            span.textContent = valor[val];

                            //Adição dos dado em cada tag
                            li.appendChild(p);
                            li.appendChild(span);
                            li.classList.add("resultado-itens");
                            listaValores.appendChild(li);
    
                        }
                        
                    }
                    
                } else if(tipoRendimento[0].checked && tipoRendimento[3].checked) {

                    var valor = dado[1];
        
                    for(val in valor) {
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        const span = document.createElement("span");
                        
                        if(val == "valorPagoIR") {
                            val = "valorPagoEmIR";
                            valor[val] = 0;
                        }
    
                        if(!(val == 'aliquotaIR')) {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'aliquotaIR') {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'percent', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'tipoIndexacao' || val == 'tipoRendimento' || val == 'graficoValores') {
                            
                        } else {
                            
                            const dado = val;
                            let novo = dado.split(/(?=[A-Z])/).join(" ");
                            p.textContent = novo[0].toUpperCase() + novo.substr(1);
                            span.textContent = valor[val];
                            li.appendChild(p);
                            li.appendChild(span)
                            li.classList.add("resultado-itens");
                            listaValores.appendChild(li);
    
                        }
                        
                    }
                } else if(tipoRendimento[0].checked && tipoRendimento[4].checked) {
                    var valor = dado[2];
        
                    for(val in valor) {
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        const span = document.createElement("span");
                        
                        if(val == "valorPagoIR") {
                            val = "valorPagoEmIR";
                            valor[val] = 0;
                        }
    
                        if(!(val == 'aliquotaIR')) {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'aliquotaIR') {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'percent', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'tipoIndexacao' || val == 'tipoRendimento' || val == 'graficoValores') {
                            
                        } else {
                            
                            const dado = val;
                            let novo = dado.split(/(?=[A-Z])/).join(" ");
                            p.textContent = novo[0].toUpperCase() + novo.substr(1);
                            span.textContent = valor[val];
                            li.appendChild(p);
                            li.appendChild(span);
                            li.classList.add("resultado-itens");
                            listaValores.appendChild(li);
    
                        }
                        
                    }
                } else if(tipoRendimento[1].checked && tipoRendimento[2].checked) {
                    var valor = dado[3];
        
                    for(val in valor) {
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        const span = document.createElement("span");
                        
                        if(val == "valorPagoIR") {
                            val = "valorPagoEmIR";
                            valor[val] = 0;
                        }
    
                        if(!(val == 'aliquotaIR')) {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'aliquotaIR') {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'percent', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'tipoIndexacao' || val == 'tipoRendimento' || val == 'graficoValores') {
                            
                        } else {
                            
                            const dado = val;
                            let novo = dado.split(/(?=[A-Z])/).join(" ");
                            p.textContent = novo[0].toUpperCase() + novo.substr(1);
                            span.textContent = valor[val];
                            li.appendChild(p);
                            li.appendChild(span);
                            li.classList.add("resultado-itens");
                            listaValores.appendChild(li);
    
                        }
                        
                    }
                } else if(tipoRendimento[1].checked && tipoRendimento[3].checked) {
                    var valor = dado[4];
        
                    for(val in valor) {
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        const span = document.createElement("span");
                        
                        if(val == "valorPagoIR") {
                            val = "valorPagoEmIR";
                            valor[val] = 0;
                        }
    
                        if(!(val == 'aliquotaIR')) {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'aliquotaIR') {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'percent', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'tipoIndexacao' || val == 'tipoRendimento' || val == 'graficoValores') {
                            
                        } else {
                            
                            const dado = val;
                            let novo = dado.split(/(?=[A-Z])/).join(" ");
                            p.textContent = novo[0].toUpperCase() + novo.substr(1);
                            span.textContent = valor[val];
                            li.appendChild(p);
                            li.appendChild(span);
                            li.classList.add("resultado-itens");
                            listaValores.appendChild(li);
    
                        }
                        
                    }
                } else {
                    var valor = dado[5];
        
                    for(val in valor) {
                        const li = document.createElement("li");
                        const p = document.createElement("p");
                        const span = document.createElement("span");
                        
                        if(val == "valorPagoIR") {
                            val = "valorPagoEmIR";
                            valor[val] = 0;
                        }
    
                        if(!(val == 'aliquotaIR')) {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'aliquotaIR') {
                            valor[val] = new Intl.NumberFormat('pt-br', { style: 'percent', currency: 'BRL' }).format(valor[val]);
                        }
    
                        if(val == 'tipoIndexacao' || val == 'tipoRendimento' || val == 'graficoValores') {
                            
                        } else {
                            
                            const dado = val;
                            let novo = dado.split(/(?=[A-Z])/).join(" ");
                            p.textContent = novo[0].toUpperCase() + novo.substr(1);
                            span.textContent = valor[val];
                            li.appendChild(p);
                            li.appendChild(span);
                            li.classList.add("resultado-itens");
                            listaValores.appendChild(li);
    
                        }
                        
                    }
                } 
            }    
        }
        
    });
                    
    //enviando a requição

    xhr.send()
})
    





