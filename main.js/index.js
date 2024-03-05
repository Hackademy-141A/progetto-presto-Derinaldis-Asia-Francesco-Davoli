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

 let btnFooter = document.querySelectorAll('#btnFooter')

 BtnDarkMode.addEventListener('click', ()=>{
    if (clicked == true){
        document.documentElement.style.setProperty('--light','rgb(20,20,20)')
        document.documentElement.style.setProperty('--dark','rgb(245,245,245)')

        BtnDarkMode.innerHTML = `<i class="fa-regular fa-sun my-icon" style="color: #63E6BE;"></i>`
        
        btnFooter.forEach((btnFooter)=>{
            btnFooter.style.color = '(--dark)'
        })

        clicked = false;

        // impostare coppia chiave valore

        localStorage.setItem ('mode','dark')

    } else {
        document.documentElement.style.setProperty('--light','rgb(245,245,245)')
        document.documentElement.style.setProperty('--dark','rgb(20,20,20)')

        BtnDarkMode.innerHTML = `<i class="fa-regular fa-moon my-icon" style="color: #63E6BE;"></i>`

       
        clicked = true;
        
        btnFooter.forEach((btnFooter)=>{
            btnFooter.style.color = '(--light)'
        })
        

        localStorage.setItem ('mode','light')

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
        
        btnFooter.forEach((btnFooter)=>{
            btnFooter.style.color = 'black'
        })



        clicked = true;

 }

let immagine= document.querySelector('#immagine')

let observerImg= new IntersectionObserver ((elementi)=>{
    elementi.forEach((elemento)=>{
        if(elemento.isIntersecting){
            immagine.classList.add('fadeRight')
            
            
        }
    })
})

observerImg.observe(immagine);


// window.addEventListener('scroll',()=> {
//     let scrolled = window.scrollY
//     if(scrolled>300){
//         immagine.classList.add('fadeRight')
//     }else{
//         immagine.classList.remove('fadeRight')
//     }
// })



// setInterval (()=>{


//     counter++
//     console.log(counter)
// })

let firstNumber = document.querySelector ("#firstNumber");
let secondNumber = document.querySelector ("#secondNumber");
let thirdNumber = document.querySelector ("#thirdNumber");



function createInterval(element,final,number) {
    let counter = 0;
    
    let interval = setInterval (()=>{
        if (counter < final){
            counter++
            element.innerHTML = counter;
        } else {
            clearInterval(interval)
        }
        
        
        
    },number)
    
}

let isChecked = false;



let observer = new IntersectionObserver ((elementi)=>{
    elementi.forEach ((elemento)=>{
        if (elemento.isIntersecting && isChecked==false ){
            createInterval(firstNumber,100,50)
            createInterval(secondNumber,500,10)
            createInterval(thirdNumber,1000,1)
            isChecked = true;
        }
    })
})

observer.observe(thirdNumber);


fetch('../car1.json')
.then(response => response.json())
.then(data => {
    
    // console.log(data)
    
    let lastCardsWrapper = document.querySelector('#lastCardsWrapper');
    
    function createLastCards(array) {
        
        let final = [];
        
        do{
            let randIndex = Math.floor(Math.random()*(47 -0 + 1)+1);
            // console.log(randIndex)
            if (!final.includes(array[randIndex])) {
                final.push(array[randIndex]);
            }
        } while (final.length <= 5)
            
        final.forEach( (annuncio)=> {
                
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', 'my-5' );
            div.innerHTML = `
            <div class="card overflow-hidden" >
            
            <div class="position-relative overflow-hidden">
            <a href="">
            <img src="../img/dottr.jpg" class="card-img-top img-zoom" alt="...">
            </a>
            
            <div class="position-absolute bottom-0 start-0 bg-white rounded-top py-1 px-3 mx-3 text-category bottomCategory">
            ${annuncio.category}
            </div>
            </div>
            
            <div class="card-body text-center">
            
            <p class="text-price">
            ${annuncio.price} €
            </p>
            <a href="#" class="text-decoration-none">
            <h5 class="card-title">${annuncio.name}</h5>
            </a>
            </div>
            </div>
            `
            
            lastCardsWrapper.appendChild(div)
            
        })
      
    }
    
    createLastCards(data);
    
})



    
    
    
    