// elementi catturati
let nav = document.querySelector(".nav");
let logo = document.querySelector ("#logo")
let containerNavbar = document.querySelector('.container-navbar')
let list = document.querySelectorAll('#list')
let icona= document.querySelector('#icona')

// effetto navbar
window.addEventListener ('scroll', ()=>{
    let scrolled = window.scrollY
    if (scrolled>0){
        containerNavbar.classList.add('sticky-top');
        nav.style.backgroundColor='var(--rooot)';
        nav.classList.add('fadeIn')
        
        list.forEach((list)=>{
            list.style.color='white'
        })
        
        
        
    }else{
        containerNavbar.classList.remove('sticky-top');
        nav.style.backgroundColor='(--light)';
        list.forEach((list)=>{
            list.style.color='white'
        })
        containerNavbar.style.transform=''
        nav.classList.remove('fadeIn')
        
        
    }
    
})

// stile di tutto il documento
let BtnDarkMode = document.querySelector('#BtnDarkMode')

let clicked = true;

BtnDarkMode.addEventListener('click', ()=>{
   if (clicked == true){
       document.documentElement.style.setProperty('--light','rgb(20,20,20)')
       document.documentElement.style.setProperty('--dark','rgb(245,245,245)')

       BtnDarkMode.innerHTML = `<i class="fa-regular fa-sun my-icon" style="color: #63E6BE;"></i>`

       clicked = false;

   } else {
       document.documentElement.style.setProperty('--light','rgb(245,245,245)')
       document.documentElement.style.setProperty('--dark','rgb(20,20,20)')

       BtnDarkMode.innerHTML = `<i class="fa-regular fa-moon my-icon" style="color: #63E6BE;"></i>`

       clicked = true;

   }
})


let mode = localStorage.getItem('mode')

if (mode==='dark') {
   document.documentElement.style.setProperty('--light','rgb(20,20,20)')
   document.documentElement.style.setProperty('--dark','rgb(245,245,245)')
   clicked = false;

   // impostare coppia chiave valore

   localStorage.setItem ('mode','dark')



} else {
   document.documentElement.style.setProperty('--light','rgb(245,245,245)')
       document.documentElement.style.setProperty('--dark','rgb(20,20,20)')

       BtnDarkMode.innerHTML = `<i class="fa-regular fa-moon my-icon" style="color: #63E6BE;"></i>`

       clicked = true;

}

//!prendere dei dati da una risorsa esterna

//? 1- fetch() -> collegarsi al json
//? 2- .then() -> estrarre dalla PROMISE il contenuto mediante il metodo .json()
//? 3- .then() -> dall'oggetto ottenuto effettuare delle operazioni.


fetch('../car1.json')
.then(response => response.json())
.then(data => {    
    console.log(data) //array di oggetti
    
    //catturo il contenitore dei radio buttons
    let radioWrapper = document.querySelector('#radioWrapper');
    
    //catturo il contenitore delle card degli annunci
    let cardsWrapper = document.querySelector('#cardsWrapper');
    
    //catturo l'inputRange ed il paragrafo
    let inputRange = document.querySelector('#inputRange');
    let numberPrice = document.querySelector('#numberPrice');
    
    //catturo il campo wordInput
    let wordInput = document.querySelector('#wordInput');
    
    
    //creo la funzione per estrapolare le singole categorie
    function setCategory() {
        
        let uniqueCategories = [];
        
        data.forEach(annuncio => {
            if(!uniqueCategories.includes(annuncio.category)){
                uniqueCategories.push(annuncio.category)
            }
        });
        
        uniqueCategories.forEach(category => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="categories" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `
            
            radioWrapper.appendChild(div);
        })
    }
    
    
    //creo le card degli annunci
    function createCards(array) {
        //ripulire il contenitore
        cardsWrapper.innerHTML = ``
        
        
        array.forEach(annuncio => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-3' , 'my-2');
            div.innerHTML = `
            <!-- annuncio -->
            <div class="card" >
            <!-- div che ci serve per delimitare quest'area ed aggiungere l'effetto zoom -->
            <div class="position-relative overflow-hidden">
            <a href="">
            <img src="../img/car.jpg" class="card-img-top img-zoom" alt="...">
            </a>
            <!-- div che mostrerà la categoria -->
            <div class="position-absolute bottom-0 start-0 bg-white rounded-top py-1 px-3 mx-3 text-category">
            ${annuncio.category}
            </div>
            </div>
            
            <div class="card-body">
            
            <p class="text-price">
            € ${annuncio.price}
            </p>
            <a href="#" class="text-decoration-none">
            <h5 class="card-title">${annuncio.name}</h5>
            </a>
            </div>
            </div>
            `
            
            cardsWrapper.appendChild(div)
        })
    }
    createCards(data)
    
    
    //filtro per categoria
    function filterByCategory(array) {
        let arrayFromNodelist= Array.from(radioCategories);
        let checkedCategory = arrayFromNodelist.find(radioButton => radioButton.checked);
        let category = checkedCategory.id;
        
        
        
        
        
        if (category == 'All') {
            return array;
        } else {
            let filtered = array.filter(annuncio => annuncio.category == category);
            return filtered;
        }
    }
    
    //invochiamo le funzioni
    setCategory()
    createCards(data)
    
    
    //catturo tutti i radio buttons delle categorie
    let radioCategories = document.querySelectorAll('.form-check-input');
    radioCategories.forEach(radioButton=>{
        // console.log(radioButton.id)
        radioButton.addEventListener('click', ()=>{
            let category = radioButton.id;
            filterByCategory(category);
        })
    })
    
    
    //impostare il range del filtro per prezzo
    function setInputPrice() {
        //estrarre tutti i prezzi degli annunci
        let prices = data.map(annuncio => Number(annuncio.price))
        // console.log(prices);
        
        
        prices.sort((a, b)=> a-b)
        let maxPrice = prices.pop();
        
        
        
        inputRange.max = maxPrice;
        inputRange.value = maxPrice;
        numberPrice.innerHTML = `${maxPrice} €`
    }

    setInputPrice()
    
    
    function filterByPrice(array) {
        let filtered = array.filter( annuncio => Number(annuncio.price)<= Number(inputRange.value))
        return filtered;
    }
    
    
    
    
    //funzione per filtrare per parola
    function filterByWord(pippo) {
        //la parola deve essere inclusa nel nome dell'annuncio
        let filtered = pippo.filter(annuncio => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }
    
    // filtro globale
    
    
    inputRange.addEventListener('input', ()=>{
        globalFilter();
        numberPrice.innerHTML = `${inputRange.value} €`
    })
    
    
    wordInput.addEventListener('input', ()=>{
        setTimeout(()=>{
            globalFilter(wordInput.value);
        }, 10)
        
    })
    
    radioCategories.forEach(radioButton=>{
        radioButton.addEventListener('click',()=>{
            globalFilter();
            
            
        })
        
        
    })
    
    function globalFilter(){
        let resultFilteredByCategory = filterByCategory(data);
        let resultFilteredByPrice = filterByPrice(resultFilteredByCategory);
        let resultFilteredByWord = filterByWord(resultFilteredByPrice);
        createCards(resultFilteredByWord);
    }
    // evento pulsante reset per ripulire i filtri e mostrare di nuovo le card

    let btnReset = document.querySelector ('#btnReset')
    btnReset.addEventListener ('click',()=>{
        radioCategories[0].checked = true;
        setInputPrice()
        wordInput.value =``
        globalFilter()
     
    })
    
})





