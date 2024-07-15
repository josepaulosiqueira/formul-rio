
document.addEventListener("DOMContentLoaded", function () {
    function exibirErro(elemento, mensagem) {
        let mensagemErro = elemento.parentElement.querySelector(".error-message");
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = "inline-block";
    }

    function resetarErroDeMensagem() {
        let mensagensErro = document.querySelectorAll(".error-message");
        mensagensErro.forEach(mensagem => mensagem.textContent = "");
    }

    let sit = document.getElementById("sit");
    sit.onchange = function () {
        let option = sit.options[sit.selectedIndex];
        sit.style.color = window.getComputedStyle(option).color;
    }

    function myFunction() {
        let oc = document.getElementById("OC").value;
        document.getElementById("oc").innerText = "OC: " + oc;
        let forn = document.getElementById("forn").value;
        document.getElementById("fornecedor").innerText = "Fornecedor: " + forn;
        let data = document.getElementById("data").value;
        document.getElementById("dat").innerText = "Data: " + data;
    }

    document.getElementById("OC").addEventListener("input", myFunction);
    document.getElementById("forn").addEventListener("input", myFunction);
    document.getElementById("data").addEventListener("input", myFunction);

    function formatarMoeda() {
        var elemento = document.getElementById('valor');
        var valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        elemento.value = valor;
        if(valor == 'NaN') elemento.value = '';
       
    }
    // cabecalho=(document.getElementById("cabecalho").value);
    // document.getElementById("valor").addEventListener("input", formatarMoeda);
    // oc=parseFloat(document.getElementById("OC").value) || 0;
    // cc=parseFloat(document.getElementById("cc").value) || 0;
    // prod=parseFloat(document.getElementById("prod").value) || 0;
    // lu=parseFloat(document.getElementById("lu").value) || 0;
    // nf=parseFloat(document.getElementById("nf").value) || 0;
    // data=(document.getElementById("data").value);
    // fornecedor=(document.getElementById("fornecedor").value);


    


    // function enviarEmail() {
    //     const formData = new FormData(document.getElementById("formulario"));
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("POST", "/enviar-email");
    //     xhr.setRequestHeader("Content-Type", "application/json");

    //     const data = {};
    //     formData.forEach((value, key) => {
    //         data[key] = value;
    //     });

    //     xhr.send(JSON.stringify(data));
    //     xhr.onload = function () {
    //         if (xhr.status == 200) {
    //             alert("Email enviado com sucesso!");
    //         } else {
    //             alert("Erro ao enviar o email.");
    //         }
            
    //     };
    // }
    // document.getElementById("enviar").addEventListener("input", enviarEmail);
    
   
});

document.getElementById("PDF").addEventListener("click", function(event) {
    event.preventDefault();
    generatePDF();

})
async function generatePDF() {
    const formData = new FormData(document.getElementById('formulario'));

    // Cria um novo objeto para guardar os dados do formulário
    const formValues = {};

    // Preenche o objeto com os valores do formulário
    formData.forEach((value, key) => {
        formValues[key] = value;
    });

    // Define um tamanho de página personalizado
    const pageWidth = 18; // inches (tamanho padrão 'letter') LARGURA
    const pageHeight = 40; // inches ALTURA

    // Usa html2pdf para converter o formulário preenchido em PDF
    html2pdf().from(document.body).set({ 
        margin: 1,
        filename: `Ordem_de_compra${formValues.oc}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: [pageWidth, pageHeight], orientation: 'portrait' }
    }).save();
}
