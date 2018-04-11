//Declaração de variáveis globais
var usuarios;

//Busca dados do Json no carregamento da página
window.onload = function() {
  rotinaSessao();
  rotinaLayout();
  //buscarUsuarios();
}

//Rotina necessária para avaliar se a sessão do usuário ainda está ativa (menos de 10 minutos de inatividade)
function rotinaSessao() {
  if (getS("sessaoAberta") == "S") {
    if (new Date().getTime() - getS("sessaoHora") <= 600000) {
      setS("sessaoHora", new Date().getTime());
    } else {
      clearS();
      setS("sessaoAberta", "N");
      location.replace("./index.html");
    }
  } else {
    clearS();
    location.replace("./index.html");
  }
}

//Função que carrega o layout da página de acordo com os dados do usuário e configurações customizáveis
function rotinaLayout() {
  inner("textoSaudacao", "Olá, " + getS("sessaoNomeUsuario") + "!");
}

//Funções para simplificar o uso do LocalStorage
function setS(chave, valor) {
  localStorage.setItem(chave, valor);
}

function getS(chave) {
  return localStorage.getItem(chave);
}

function clearS() {
  localStorage.clear();
}

//Funções para simplificar o uso do getElementById
function getE(id) {
  return document.getElementById(id);
}

function inner(id, conteudo) {
  document.getElementById(id).innerHTML = conteudo;
}

//Verifica todos os campso do objeto para evitar erros com atributos "undefined"
function verificaCampos(a) {
  for (var i = 0; i < a.length; i++) {
    // for(var c in a[i]){
    //   if (typeof(a[i][c]) == "undefined"){
    //     a[i][c] = "";
    //   }
    // }

    a[i].nome = v(a[i].nome);
    a[i].idade = v(a[i].idade);
    a[i].email = v(a[i].email);
    a[i].login = v(a[i].login);
    a[i].senha = v(a[i].senha);
    a[i].campo = v(a[i].campo);
  }
  return a;
}

//Seta como "" campos que estejam como "undefined"
function v(a) {
  if (typeof(a) == "undefined") {
    return "";
  } else {
    return a;
  }
}

//Busca e retorna os objetos no arquivo Json
function buscarUsuarios() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      usuarios = verificaCampos(JSON.parse(this.responseText));
    }
  };
  xmlhttp.open("GET", "./json/usuarios.json", true);
  xmlhttp.send();
}
