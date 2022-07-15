
let inputText  = document.querySelector(".tittle-tasks");
let selectType = document.getElementById("select-type");
let submit     = document.querySelector(".add-tasks");
let taskList   = document.querySelector('.show-task-list')


//todos os objetos criads serão guardados aqui

const taskObj = []

//adicionando evendo a cada click no submit
submit.addEventListener('click', function addTask(x) {
  //pegando o value do input text
  let textValue = inputText.value.trim() //tratando espaço no começo e no fim da string
  //pega o value do elemento submit => select-type => select => options
  let selectValue = selectType.value
  
  //VALIDA SE O CAMPO NÃO ESTA RECEBENDO UMA STRING VAZIA
    x.preventDefault()
  if(textValue !== ''){

    //ARMAZENANDO A TAREFA EM UM OBJ
    
    const newTask ={}

    //atribuindo valores a new task

    newTask.name   = textValue
   //recebe false por defolt pois n foi concluida 
    newTask.status = false
    //atribuindo nivel de urgencia a newTesk
    newTask.urgency= selectValue
    
    taskObj.push(newTask)
    listTask(taskObj, taskList)
  }
   
})


//função para listar e criar a tarefas
function listTask (arrTask, tagList){
  //limpar lista 
  tagList.innerHTML = ''
  for(let i = 0; i <arrTask.length; i++){
    let task = arrTask[i]
    //tamplate guarda a function que monta nosso html
    //e atribui os valores necessarios
    let template = assembleTask(task, i)
    //aplicando o que foi criado no assembleTask como filho
    //da parametro tagList => taskList => show-task-list => tag UL linha 54 no html
    tagList.appendChild(template)
    
  }
}


//task = arrTask[i] => a posição de cada objeto da lista de array
//do taskObj => que recebe os dados da funçao addTask
function assembleTask(task, index){
  //criando tag li
  let li     = document.createElement('li')
 
  
  //metodo mais rapido de criar um template de inteiro como filhos do li
  //o id do button recebe a posição do obj dentro do array
  //atribuindo uma ordem de entrada no array

  //task.name é task => arrTask[i].name => taskObj.name 
  //que recebe seu parametro pela function addTask linha 33

  //task.urgency é => arrTask[i].urgency => taskObj.urgency
  //que recebe seu parametro pela function addTask na linha 37
  li.innerHTML = `
      <button id="${index}">X</button>
      <p>${task.name}</p>
      <span>${task.urgency}</span>
  `


  return li
}

//Remover tarefas pelo button
function removeTask(event){
  //pega o evento de onde veio o click, no caso toda a tag UL
  let btnRemove = event.target
  //a condicional limita o click ao tagName 'BUTTON'
  if(btnRemove.tagName == 'BUTTON'){
    let index = btnRemove.id
  
  //(POSIÇÃO QUE INICIA A REMOÇÃO, QUANTIDADES DE ITENS A SEREM REMOVIDOS)
   taskObj.splice(index, 1)
   listTask(taskObj, taskList)
  }
}
taskList.addEventListener('click', removeTask)