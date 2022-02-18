//Função para coletar os indicadores da api

function indicadores() {

    const xhr = new XMLHttpRequest();

    xhr.open("GET","http://localhost:3000/indicadores");

    xhr.addEventListener("load", ()=> {

        const resposta = xhr.responseText;

        const dadoIndicador = JSON.parse(resposta);

        //Acessando o primeiro indicador dentro do objeto 
        const ipca = dadoIndicador[1];
        
        const texto2 = document.querySelector(".indicador__ipca-texto");

        //Armazenando o valor da propriedade nome dentro da variável texto
        texto2.textContent = ipca.nome;
        
        const numero2 = document.querySelector(".indicador__ipca-numero");
        numero2.textContent = ipca.valor + "%";
        
        const ipcaAno = document.querySelector(".indicador__ipca-ano");
        ipcaAno.textContent = "(ao ano)";
        
        const cdi = dadoIndicador[0]

        const texto1 = document.querySelector(".indicador__cdi-texto");
        texto1.textContent = cdi.nome;

        const numero1 = document.querySelector(".indicador__cdi-numero");
        numero1.textContent = cdi.valor + "%";

        const cdiAno = document.querySelector(".indicador__cdi-ano");
        cdiAno.textContent = "(ao ano)"

        
    })

    xhr.send();
}