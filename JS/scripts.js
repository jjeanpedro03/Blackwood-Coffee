// Aguarda o carregamento completo do DOM antes de executar o script.
document.addEventListener("DOMContentLoaded", () => {
    // ----------- FUNCIONALIDADE DO MENU HAMBÚRGUER -----------
    // Obtém o botão do menu hambúrguer e a lista de links
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const nav = document.querySelector("nav");
    const menuLinks = document.querySelectorAll(".menu a");

    // Adiciona um evento de clique ao botão do menu
    if (hamburgerMenu && nav) {
        hamburgerMenu.addEventListener("click", () => {
            // Alterna a classe 'active' para mostrar/esconder o menu
            hamburgerMenu.classList.toggle("active");
            nav.classList.toggle("active");
        });

        // Adiciona um evento de clique para cada link do menu
        // Isso garante que o menu feche automaticamente após um link ser clicado, melhorando a navegação em dispositivos móveis.
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (nav.classList.contains("active")) {
                    hamburgerMenu.classList.remove("active");
                    nav.classList.remove("active");
                }
            });
        });
    }

    // ----------- FUNCIONALIDADES GERAIS -----------

    // Funcionalidade do menu "Clique para saber mais"
    const cliqueParaSaberMais = document.querySelector(".id-visual");
    if (cliqueParaSaberMais) {
        cliqueParaSaberMais.addEventListener("click", () => {
            // Verifica o caminho relativo e direciona para a página "Sobre nós"
            window.location.href = "HTML/Sobre nos.html";
        });
    }

    // Animação de entrada dos elementos com Intersection Observer
    // Anima cards na Home, produtos, e parágrafos com imagem em outras páginas.
    const elementosAnimados = document.querySelectorAll(
        ".card, .item-cardapio, .paragrafo_com_imagem"
    );
    if (elementosAnimados.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate__fadeInUp");
                        entry.target.style.animationPlayState = "running";
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("animate__animated");
            elemento.style.animationPlayState = "paused"; // Pausa para iniciar com o observer
            observer.observe(elemento);
        });
    }

    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Funcionalidade do botão "Voltar" (para páginas internas)
    const botaoVoltar = document.querySelector(".botão-voltar");
    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", () => {
            window.history.back();
        });
    }

    // Validação do formulário de contato (somente na página de Contato)
    const formContato = document.querySelector(".formulario-contato");
    const customAlert = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");
    const closeAlertBtn = document.getElementById("close-alert-btn");

    // Função para mostrar a caixa de diálogo personalizada
    function showAlert(message) {
        if (customAlert && alertMessage) {
            alertMessage.textContent = message;
            customAlert.classList.add("visible");
        }
    }

    // Função para fechar a caixa de diálogo personalizada
    function hideAlert() {
        if (customAlert) {
            customAlert.classList.remove("visible");
        }
    }

    // Adiciona evento de clique para fechar o alerta
    if (closeAlertBtn) {
        closeAlertBtn.addEventListener("click", hideAlert);
    }

    // Adiciona evento de submit para o formulário
    if (formContato) {
        formContato.addEventListener("submit", function (event) {
            event.preventDefault();
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const mensagem = document.getElementById("mensagem").value;

            if (nome === "" || email === "" || mensagem === "") {
                showAlert("Por favor, preencha todos os campos obrigatórios.");
            } else {
                showAlert(
                    "Mensagem enviada com sucesso! Em breve, retornaremos o contato."
                );
                formContato.reset();
            }
        });
    }

    // ----------- FUNCIONALIDADE DO FORMULÁRIO DE RESERVAS CORRIGIDA -----------
    // Esta parte agora envia os dados para a Formspree e redireciona para a página de sucesso com JavaScript,
    // já que o redirecionamento nativo da Formspree é um recurso pago.
    const formReserva = document.getElementById("formReserva");
    if (formReserva) {
        formReserva.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const data = document.getElementById("data").value;
            const hora = document.getElementById("hora").value;
            const pessoas = document.getElementById("pessoas").value;

            if (
                nome === "" ||
                email === "" ||
                data === "" ||
                hora === "" ||
                pessoas === ""
            ) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return; // Encerra a função se a validação falhar
            }

            // URL da sua página de sucesso no GitHub Pages
            const urlSucesso =
                "https://jjeanpedro03.github.io/Blackwood-Coffee/HTML/sucesso.html";

            const formData = new FormData(formReserva);

            fetch(formReserva.action, {
                method: formReserva.method,
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Redireciona o usuário para a página de sucesso
                        window.location.href = urlSucesso;
                    } else {
                        console.error("Ocorreu um erro no envio.");
                        alert("Ocorreu um erro. Tente novamente mais tarde.");
                    }
                })
                .catch((error) => {
                    console.error("Erro de rede:", error);
                    alert("Ocorreu um erro. Tente novamente mais tarde.");
                });
        });
    }
});
