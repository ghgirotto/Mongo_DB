const api = "http://localhost:3000";

async function criarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("mensagem");

  try {
    const resposta = await fetch(api + "/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email })
    });

    const dados = await resposta.json();

    msg.textContent = dados.mensagem;
    msg.className = "sucesso";

    // limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";

    carregarUsuarios();

  } catch (error) {
    msg.textContent = "Erro ao conectar com servidor ❌";
    msg.className = "erro";
  }
}

async function carregarUsuarios() {
  const res = await fetch(api + "/usuarios");
  const dados = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.nome + " - " + u.email;
    lista.appendChild(li);
  });
}

carregarUsuarios();