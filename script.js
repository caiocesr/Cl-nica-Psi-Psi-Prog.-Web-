document.addEventListener("DOMContentLoaded", function() {
    const btnServicos = document.querySelector(".btn-servicos");
    const secaoServicos = document.querySelector("#servicos");

    if (btnServicos && secaoServicos) {
        btnServicos.addEventListener("click", function(event) {
            event.preventDefault();
            secaoServicos.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (window.location.hash === "#sobre") {
        const secaoSobre = document.querySelector(".sobre");
        if (secaoSobre) {
            secaoSobre.scrollIntoView({ behavior: "smooth" });
        }
    }

    if (window.location.hash === "#formulario") {
        const formulario = document.querySelector("form");
        if (formulario) {
            formulario.scrollIntoView({ behavior: "smooth" });
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const servicoSelecionado = urlParams.get("servico");

    if (servicoSelecionado) {
        const campoServico = document.getElementById("servico");
        if (campoServico) {
            campoServico.value = servicoSelecionado;
        }
    }

    const db = window.db;
    const serverTimestamp = window.serverTimestamp;
    const collection = window.collection;
    const addDoc = window.addDoc;

    const appointmentForm = document.getElementById('appointmentForm');
    const btnAgendar = document.querySelector('.btn-agendar');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const servico = document.getElementById('servico').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;

            if (!nome || !email || !telefone || !servico || !data || !horario || servico === "") {
                alert('Por favor, preencha todos os campos do formulário para agendar.');
                return;
            }

            if (btnAgendar) {
                btnAgendar.disabled = true;
                btnAgendar.textContent = 'Agendando...';
            }

            try {
                await addDoc(collection(db, 'consultas'), {
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    servico: servico,
                    data: data,
                    horario: horario,
                    timestampAgendamento: serverTimestamp()
                });

                alert('Sua consulta foi agendada com sucesso! Em breve entraremos em contato.');
                appointmentForm.reset();

            } catch (error) {
                console.error('Erro ao agendar consulta: ', error);
                alert('Ocorreu um erro ao agendar sua consulta. Por favor, tente novamente mais tarde.');

            } finally {
                if (btnAgendar) {
                    btnAgendar.disabled = false;
                    btnAgendar.textContent = 'Agendar Consulta';
                }
            }
        });
    }

});
