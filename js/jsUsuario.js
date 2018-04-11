//Declaração de variáveis globais
var sessaoUsuario;
var tabelaPopulada = false;
var pessoas;

//Verifica se o usuário já realizou login
window.onload = function() {
  buscarUsuarios();
}

function buscarUsuarios(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pessoas = verificaCampos(JSON.parse(this.responseText));
    }
  };
  xmlhttp.open("GET", "./json/usuarios.json", true);
  xmlhttp.send();
}

//Declaração das funções
function popularTabela() {
  var dadosTabela = "";

  if (pessoas.length > 0) {
    for (var i = 0; i < pessoas.length; i++) {
      dadosTabela += "<tr><td>" + pessoas[i].nome + "</td><td>" + pessoas[i].idade + "</td><td>" + pessoas[i].email + "</td></tr>";
    }
    if (!tabelaPopulada) {
      document.getElementById("dadosTabela").innerHTML += dadosTabela;
      tabelaPopulada = true;
    }
  } else {
    dadosTabela += "Não há dados";
    document.getElementById("dadosTabela").innerHTML += dadosTabela;
  }
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
