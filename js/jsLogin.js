//Declaração de variáveis globais
var usuarios;

//Busca dados do Json no carregamento da página
window.onload = function() {
  rotinaSessao();
  buscarUsuarios();
}

//Rotina necessária para avaliar se a sessão do usuário ainda está ativa (menos de 10 minutos de inatividade)
function rotinaSessao() {
  if (getS("sessaoAberta") == "S") {
    if (new Date().getTime() - getS("sessaoHora") <= 600000) {
      setS("sessaoHora", new Date().getTime());
      location.replace("./principal.html");
    } else {
      clearS();
      setS("sessaoAberta", "N");
      location.replace("./index.html");
    }
  } else if (getS("sessaoAberta") == "N") {
    inner("erroSessao", "A sessão expirou. Faça login novamente!");
    clearS();
  } else {
    clearS();
    //location.replace("./index.html"); //redirecionar para pagina principal! (usar nas páginas internas)
  }
}

//Validação dos dados informados na tela de login
function validarLogin() {
  inner("erroSessao", "");

  var user = document.getElementById("inputUsuario").value;
  var pass = document.getElementById("inputSenha").value;

  if (user == "") {
    inner("erroUsuario", "Digite aqui seu nome de usuário!");
    return;
  } else {
    var userExiste = false;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].login == user) {
        setS("sessaoCodigoUsuario", i);
        inner("erroUsuario", "");
        userExiste = true;
        break;
      }
    }
    if (!userExiste) {
      inner("erroUsuario", "O usuário informado não existe!");
      return;
    }
  }

  if (pass == "") {
    inner("erroSenha", "Digite aqui sua senha!");
    return;
  } else {
    if (usuarios[getS("sessaoCodigoUsuario")].senha == pass) {
      inner("erroSenha", "");
      getE("botaoEntrar").className += " is-loading";
      setS("sessaoNomeUsuario", usuarios[i].nome);
      setS("sessaoAberta", "S");
      setS("sessaoHora", new Date().getTime());
      location.replace("./principal.html");
    } else {
      inner("erroSenha", "A senha está incorreta!");
    }
  }
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
