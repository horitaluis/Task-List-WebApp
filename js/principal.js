// testando se o arquivo js foi carregado no html.
console.log("teste");

// function que cria uma nova task a partir dos dados do form
function createNewTask(day, icon, name, description, identification) {

	//cria os elementos da nova task e coloca seus atributos neles
	var newTask = document.createElement("div");
	newTask.setAttribute("class", "task");
	newTask.setAttribute("id", identification);

	var newCheckbox = document.createElement("input");
	newCheckbox.setAttribute("class", "checkbox");
	newCheckbox.setAttribute("type", "checkbox");
	
	newCheckbox.addEventListener("click", function() {
		var checkbox_val = newCheckbox.value;
	    if (newCheckbox.checked == true) {
		    console.log("Eu checkbox fui clicado");

			/* o this se refere ao elemento onde o evento esta sendo colocado 
			(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
			numero do "i")
			e o toggle add a classe ou tira conforme ela estar no elemento ou não */
			this.setAttribute("id", "id_you_like" + Math.random());
			var newCheckboxId = this.id;
			console.log(newCheckboxId);

			// cria um elemento para deletar o elemento da task
			var novoTaskDelete = document.createElement("div");
			novoTaskDelete.setAttribute("class", "task-delete");
			novoTaskDelete.classList.add(newCheckboxId);

			var novoTaskNameDelete = document.createElement("h2");
			novoTaskNameDelete.setAttribute("class", "task-name-delete");

			console.log(this.parentNode.children[2].children[0].textContent);
			var textoTask = this.parentNode.children[2].children[0].textContent;
			novoTaskNameDelete.textContent = textoTask;

			var novoDelete = document.createElement("a");
			novoDelete.setAttribute("class", "delete");
			novoDelete.setAttribute("href", "#");

			var novoDeleteImg = document.createElement("svg");
			novoDeleteImg.setAttribute("class", "delete-img");

			// insere o elemento criado dentro do container
			var container = document.querySelector(".main-container");
			container.appendChild(novoTaskDelete);
			novoTaskDelete.appendChild(novoTaskNameDelete);
			novoTaskDelete.appendChild(novoDelete);
			novoDelete.appendChild(novoDeleteImg);

			
			novoDelete.addEventListener("click", function(event) {
				event.preventDefault();
				console.log("Eu botao delete fui clicado");

				/* o this se refere ao elemento onde o evento esta sendo colocado 
				(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
				numero do "i")
				e o toggle add a classe ou tira conforme ela estar no elemento ou não */
				console.log(newCheckboxId);
				document.getElementById(newCheckboxId).parentNode.remove();
				//document.querySelector(this.id).remove();
				this.parentNode.remove();
			});
	    } else if (this.checked == false) {
	    	// deleta a novaTaskDelete referente ao checkbox quando o checkbox é desmarcado
			console.log("checkbox demarked");
			document.querySelector(".task-delete").remove();
			return;
	    }
	});

	var newIcon = document.createElement("i");
	newIcon.setAttribute("class", "icon");
	newIcon.classList.add(icon);

	var newInfo = document.createElement("div");
	newInfo.setAttribute("class", "task-info");

	var newName = document.createElement("h3");
	newName.setAttribute("class", "task-name");
	newName.textContent = name;

	var newDescription = document.createElement("p");
	newDescription.setAttribute("class", "task-description");
	newDescription.textContent = description;

	var newFavorite = document.createElement("a");
	newFavorite.setAttribute("class", "favorite");
	newFavorite.setAttribute("href", "#");

	/* note que para criar elementos svg com js precisamos usar o metodo createElementsNS
	 onde passamos "http://www.w3.org/2000/svg" e a sua tag como argumentos */
	var newFavoriteImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	newFavoriteImg.setAttribute("class", "favorite-img");
	newFavoriteImg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	newFavoriteImg.setAttribute("viewBox", "0 0 576 512");
	// newFavoriteImg.setAttribute("fill", "#000");

	var newFavoritePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	newFavoritePath.setAttribute("d", "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z");

	newFavoriteImg.addEventListener("click", function(event) {
		event.preventDefault();
		console.log("Eu botao favorito fui clicado");

		/* o this se refere ao elemento onde o evento esta sendo colocado 
		(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
		numero do "i")
		e o toggle add a classe ou tira conforme ela estar no elemento ou não */
		this.classList.toggle("favorite-img-checked");
	});

	// coloca um elemento dentro do outro no dom
	newTask.appendChild(newCheckbox);
	newTask.appendChild(newIcon);
	newTask.appendChild(newInfo);
	newInfo.appendChild(newName);
	newInfo.appendChild(newDescription);
	newTask.appendChild(newFavorite);
	newFavorite.appendChild(newFavoriteImg);
	newFavoriteImg.appendChild(newFavoritePath);

	// usando if/else para verificar em qual dia colocar as nova task
	if (day == "today") {
		var todayContainer = document.querySelector(".today-container");
		todayContainer.appendChild(newTask);
	} else if (day == "tomorrow") {
		var tomorrowContainer = document.querySelector(".tomorrow-container");
		tomorrowContainer.appendChild(newTask);
	}
}

//criando a funcao responsavel por pegar as tasks existentes no arquivo json atraves de ajax.
function getDataJson() {

	// criando o objeto XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// fazendo o XMLHttpRequest atraves do object method open
	xhr.open("GET", "https://horitaluis.github.io/task-list-webApp/data.json");

	// criando um event listener para exebir os dados do json quando a pagiina é carregada
	xhr.addEventListener("load", function() {
		console.log(xhr.responseText);
		// atribuindo a variavel response a resposta em texto da requesicao.
		var response = xhr.responseText;
		// convertendo o JSON em objeto JS com o method parse.
		var tasksJson = JSON.parse(response);
		populateTasks(tasksJson);
	});

	// enviando o request para o servidor atraves do object method send
	xhr.send();

}

//criando funcao responsavel por popular o dom com as tasks salvas no arquivo JSON.
function populateTasks() {
	console.log(tasksJson);
}

// criando a variavel favorito e associando a ela os elementos com a classe favorite.
var favorito = document.querySelectorAll(".favorite-img");
console.log(favorito);

/* criando um loop para adicionar o evento de click a todos os elementos com a 
classe favorite (isso é necessario pois o query selector all retorna uma array */
for (var i = 0; i < favorito.length; i++) {
	favorito[i].addEventListener("click", function(event) {
		event.preventDefault();
		console.log("Eu botao favorito fui clicado");

		/* o this se refere ao elemento onde o evento esta sendo colocado 
		(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
		numero do "i")
		e o toggle add a classe ou tira conforme ela estar no elemento ou não */
		this.classList.toggle("favorite-img-checked");
	});
	console.log(i);
}

var checkBox = document.querySelectorAll(".checkbox");
console.log(checkBox);

/* criando um loop para adicionar o evento de click a todos os elementos com a 
classe .checkbox (isso é necessario pois o query selector all retorna uma array */
for (var i = 0; i < checkBox.length; i++) {
	checkBox[i].addEventListener("click", function() {
		console.log("Eu checkbox fui clicado");

		if (this.checked == false) {
			console.log("checkbox demarked");
			document.querySelector(".task-delete").remove();
			return;
		}

		console.log("checkbox marked");

		/* o this se refere ao elemento onde o evento esta sendo colocado 
		(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
		numero do "i")
		e o toggle add a classe ou tira conforme ela estar no elemento ou não */
		this.setAttribute("id", "id_you_like" + Math.random());
		var newCheckboxId = this.id;
		console.log(newCheckboxId);

		// cria um elemento para deletar o elemento da task
		var novoTaskDelete = document.createElement("div");
		novoTaskDelete.setAttribute("class", "task-delete " + this.id);

		var novoTaskNameDelete = document.createElement("h2");
		novoTaskNameDelete.setAttribute("class", "task-name-delete");

		console.log(this.parentNode.children[2].children[0].textContent);
		var textoTask = this.parentNode.children[2].children[0].textContent;
		novoTaskNameDelete.textContent = textoTask;

		var novoDelete = document.createElement("a");
		novoDelete.setAttribute("class", "delete");
		novoDelete.setAttribute("href", "#");

		var novoDeleteImg = document.createElement("svg");
		novoDeleteImg.setAttribute("class", "delete-img");

		// insere o elemento criado dentro do container
		var container = document.querySelector(".main-container");
		container.appendChild(novoTaskDelete);
		novoTaskDelete.appendChild(novoTaskNameDelete);
		novoTaskDelete.appendChild(novoDelete);
		novoDelete.appendChild(novoDeleteImg);

		
		novoDelete.addEventListener("click", function(event) {
			event.preventDefault();
			console.log("Eu botao delete fui clicado");

			/* o this se refere ao elemento onde o evento esta sendo colocado 
			(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
			numero do "i")
			e o toggle add a classe ou tira conforme ela estar no elemento ou não */
			console.log(newCheckboxId);
			document.getElementById(newCheckboxId).parentNode.remove();
			//document.querySelector(this.id).remove();
			this.parentNode.remove();
		});
	});
	console.log(i);
}

function colocaEventoBotaoDelete(checkboxId) {
	var botaoDelete = document.querySelectorAll(".delete");
	console.log(botaoDelete);

	/* criando um loop para adicionar o evento de click a todos os elementos com a 
	classe favorite (isso é necessario pois o query selector all retorna uma array */
	for (var i = 0; i < botaoDelete.length; i++) {
		botaoDelete[i].addEventListener("click", function(event) {
			event.preventDefault();
			console.log("Eu botao delete fui clicado");

			/* o this se refere ao elemento onde o evento esta sendo colocado 
			(ele foi necessario pois caso o "favorito[i]"sempre retornava o ultimo
			numero do "i")
			e o toggle add a classe ou tira conforme ela estar no elemento ou não */
			console.log();
			//document.querySelector(this.id).remove();
			this.parentNode.remove();
		});
		console.log(i);
	}
}

// funcionalidade que adiciona nova task com o botão de adicionar

/* function que recupera o valor do botao tipo radio que esta checado.
ela faz isso atravez do atributo name dos inputs */
function getRadioCheckedValue(radio_name)
{
   var oRadio = document.forms[0].elements[radio_name];
 
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
 
   return '';
}

/* nos odemos obter a referencia para o grupo de radio buttons usando o name do grupo,
  e intao interando sobre todos os input radio para testar qual deles está checked */




/* function que acessa as checkboxes, seus valores e seus estados 
ela faz isso atravez do atributo name dos inputs */
function testCheckbox(oCheckbox)
{
    var checkbox_val = oCheckbox.value;
    if (oCheckbox.checked == true)
    {
        alert("Checkbox with name = " + oCheckbox.name + " and value =" +
                checkbox_val + " is checked");
    }
    else
    {
        alert("Checkbox with name = " + oCheckbox.name + " and value =" +
              checkbox_val + " is not checked");
    }
}

// function que retorna o valor do input select quando ele é mudado
function getSelectValueWhenChanged(selectId) {
	var changeFormSelect = document.getElementById(selectId);
	changeFormSelect.addEventListener('change', function() {
	  console.log(this.value);
	  this.setAttribute("class", this.value + "__select");
	}, false);
}

getSelectValueWhenChanged("select-icon");

// function que pega o valor do elemento select
function getDropDownListValue(name) {
	var oForm = document.querySelector(".icon-fieldset");

	var selected_index = oForm.elements[name].selectedIndex;
	 
	if(selected_index > 0)
	{
	   return oForm.elements[name].options[selected_index].value;
	}
}

// function que quando o usuario clica fora do form add a class hide para ele
function hideFormWhenClickOutside() {
	var formNewTaskContainer = document.querySelector(".form-new-task-container");
	
	// adiciona um eventListener que escuta add a class hide quando algo fora do form e botão é clicado	
	document.addEventListener("click", function(event) {
		if (event.target.closest(".form-new-task-container")) {
			// alert("modal");
			return;
		} else if (event.target.closest(".btn-new-task")) {
			// alert("btn");
			return;
		}
		
		//alert("fora do modal");
		formNewTaskContainer.classList.add("hide");
	});
}

// chamando a function hideFormWhenClickOutside
hideFormWhenClickOutside();

var btnNewTask = document.querySelector(".btn-new-task");

// o botão de adicionar task mostra ou esconde o formulario da nova task
btnNewTask.addEventListener("click", function(event) {
	event.preventDefault();
	var formNewTaskContainer = document.querySelector(".form-new-task-container");
	formNewTaskContainer.classList.toggle("hide");
});

var formButton = document.querySelector(".form-button");

// o botao do formulario task salva os dados da nova task no servidor e cria a nova task no dom
formButton.addEventListener("click", function(event) {
	event.preventDefault();
	var dayRadio = getRadioCheckedValue("day");
	console.log(dayRadio);
	// var iconRadio = getRadioCheckedValue("icon");
	// console.log(iconRadio);
	var iconRadio = getDropDownListValue("icon");
	console.log(iconRadio);
	var taskName = document.querySelector("#taskName").value;
	console.log(taskName);
	var taskDescription = document.querySelector("#taskDescription").value;
	console.log(taskDescription);

	// Validando o form antes de salvar a nova task
	if (iconRadio == undefined) {
		alert("Select the icon to save the task");
	} else if (taskName.length == 0) {
		alert("Insert the task name");
	} else {
		createNewTask(dayRadio, iconRadio, taskName, taskDescription);
		alert("Task " + taskName + " successfully saved");
		var formNewTaskContainer = document.querySelector(".form-new-task-container");
		// escondendo o modal após salvar a nova task
		formNewTaskContainer.classList.toggle("hide");
	}
});

