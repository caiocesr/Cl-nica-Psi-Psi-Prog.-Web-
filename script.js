document.addEventListener("DOMContentLoaded", function() {
    // Rolagem suave ao clicar em "Serviços"
    const btnServicos = document.querySelector(".btn-servicos");
    const secaoServicos = document.querySelector("#servicos");

    if (btnServicos && secaoServicos) {
        btnServicos.addEventListener("click", function(event) {
            event.preventDefault();
            secaoServicos.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Rolagem suave ao clicar em "Sobre"
    if (window.location.hash === "#sobre") {
        const secaoSobre = document.querySelector(".sobre");
        if (secaoSobre) {
            secaoSobre.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Rolagem suave ao acessar "#formulario"
    if (window.location.hash === "#formulario") {
        const formulario = document.querySelector("form");
        if (formulario) {
            formulario.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Preencher automaticamente o serviço no formulário
    const urlParams = new URLSearchParams(window.location.search);
    const servicoSelecionado = urlParams.get("servico");

    if (servicoSelecionado) {
        const campoServico = document.getElementById("servico");
        if (campoServico) {
            campoServico.value = servicoSelecionado;
        }
    }
});
