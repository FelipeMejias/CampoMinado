//const quantidadeLinhas=prompt('Com quantas linhas quer jogar? cada linha possuirá 9 colunas')
//const quantidadeBombas=prompt('Com quantas bombas quer jogar?')
const lista=[]
let objeto={}
const listaBombas=[]
const quantidadeLinhas=9
adicionarBombas(9,17)
printarCasas(9)
let contador=0

function adicionarBombas(linhasQtd,bombasQtd){
    for(let k=0; k<9*linhasQtd; k++){
        if(k<bombasQtd){listaBombas.push('<img src="bomba.jpg">')}
        else{listaBombas.push(0)}
    }
    listaBombas.sort(comparador)
}
function comparador() { 
	return Math.random() - 0.5; 
}


function printarCasas(linhasQtd){
    const container=document.querySelector('.container')
    let indice=0
    for(let i=1; i<=linhasQtd; i++){
        container.innerHTML+=`
            <div class="linha linha${i}"></div>
        `
        const linha=document.querySelector(`.linha${i}`)
        for(let j=1; j<10; j++){

            objeto={
                linha:i,
                coluna:j,
                verso:null
            }
            objeto.verso=listaBombas[indice]
            indice++
            lista.push(objeto);
            

            linha.innerHTML+=`
                <div onclick="virarCasa('l${i}-${j}')" class="casa l${i}-${j}">
                
                    <div class="front-face face">
                        
                    </div>
                    <div class="back-face face">
                        <p>${objeto.verso}</p>
                    </div>
                </div>
            ` 
        }
    }
}

function virarCasa(lxx){
    const casaSelecionada=document.querySelector(`.${lxx}`)
    casaSelecionada.classList.add('virado')
    checarSeEhBomba(`.${lxx}`)
}





function virarTodas(linhasQtd){
    for(let i=1; i<=linhasQtd; i++){
        for(let j=1; j<10; j++){
            virarCasa(`l${i}-${j}`)
        }
    }
}



function definirVerso(a,b,linhasQtd){
    for(let i=1; i<=linhasQtd; i++){
        for(let j=1; j<10; j++){
            for(let k=0; k<9*linhasQtd; k++){
                objetoVez=lista[k]
                if(objetoVez.linha==i+a && objetoVez.coluna==j+b && objetoVez.verso=='<img src="bomba.jpg">'){
                    mudarVerso(i,j,linhasQtd)

                }
            }
        }
            
    }
}

definirVerso(-1,-1,quantidadeLinhas)
definirVerso(-1,0,quantidadeLinhas)
definirVerso(-1,1,quantidadeLinhas)
definirVerso(0,-1,quantidadeLinhas)
definirVerso(0,1,quantidadeLinhas)
definirVerso(1,-1,quantidadeLinhas)
definirVerso(1,0,quantidadeLinhas)
definirVerso(1,1,quantidadeLinhas)


function mudarVerso(x,y,linhasQtd){
    for(let k=0; k<9*linhasQtd; k++){
        objetoVez=lista[k]
        if(objetoVez.linha==x && objetoVez.coluna==y){
            if(objetoVez.verso!='<img src="bomba.jpg">'){
                const casaNova=document.querySelector(`.l${x}-${y} .back-face p`)
                casaNova.innerHTML=parseInt(casaNova.innerHTML)+1
                const numero=casaNova.innerHTML
                definirCor(numero,casaNova)
            }
        }
    }
}

function definirCor(numero,casa){
    if(numero==1){
        casa.classList.add('azul')
    }
    if(numero==2){
        casa.classList.add('verde')
    }
    if(numero==3){
        casa.classList.add('amarelo')
    }
    if(numero==4){
        casa.classList.add('vermelho')
    }
    if(numero==5){
        casa.classList.add('rosa')
    }
    
}

