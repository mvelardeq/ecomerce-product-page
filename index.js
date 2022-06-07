const mainImage = document.getElementById("main-image"),
btnCloseModal =document.getElementById("close-modal"),
mainImageModal = document.getElementById("main-image-modal")
let activeImage = document.querySelector('.product-images .other-image.selected')


mainImage.addEventListener('click',e=>{
    if(window.innerWidth>960){
    document.getElementById("light-box").classList.toggle("hidden")
    mainImageModal.querySelector('img').setAttribute('src',e.target.getAttribute('src'))
    }
})

btnCloseModal.addEventListener('click',e=>{
    document.getElementById("light-box").classList.toggle("hidden")
})

const othersImage = document.querySelectorAll(".other-image")

function makeActiveImage(someImage, allImages){
    const selectedImages = document.querySelectorAll(".selected")
    if(!someImage.classList.contains('selected')){
        mainImage.querySelector('img').setAttribute("src",someImage.querySelector('img').dataset.image)
        mainImageModal.querySelector('img').setAttribute("src",someImage.querySelector('img').dataset.image)
        selectedImages.forEach(el=>{
            el.classList.toggle("selected")
        })
        const imagesTarget = [...allImages].filter(el=>{
            return el.querySelector('img').getAttribute("src")==someImage.querySelector('img').getAttribute('src')
        })
        imagesTarget.forEach(el=>el.classList.add("selected"))
        activeImage = document.querySelector('.product-images .other-image.selected')
    }
}

othersImage.forEach(otherImage=>{
    otherImage.addEventListener('click',e=>{
        makeActiveImage(e.target, othersImage)
    })
})


const btnsNext = document.querySelectorAll('.right-icon'),
btnsPrevious = document.querySelectorAll('.left-icon')

btnsNext.forEach(btnNext=>{
    btnNext.addEventListener('click',e=>{
        if(activeImage.nextElementSibling)
            makeActiveImage(activeImage.nextElementSibling,othersImage)
    })    
})

btnsPrevious.forEach(btnPrevious=>{
    btnPrevious.addEventListener('click',e=>{
        if(activeImage.previousElementSibling)
            makeActiveImage(activeImage.previousElementSibling,othersImage)
    })
})


let quantityProducts = 0,
btnPlus = document.querySelector('.quantity-products').lastElementChild,
btnMinus = document.querySelector('.quantity-products').firstElementChild,
$template = document.querySelector('template').content,
emptyPhraseVisibility = !(document.querySelector('.cart-card .list-products .empty-phrase').style.display=='none')
isProductAdded = document.querySelector('.product-added')


function btnDelete(){
    const btnDeleteProducts = document.querySelector('.product-added .delete-product-cart')
        btnDeleteProducts.addEventListener('click',e=>{
        quantityProducts=0
        document.querySelector('.quantity-products-card').textContent = quantityProducts
        document.querySelector('.quantity-products .quantity').textContent = quantityProducts
        document.querySelector('.cart-card .list-products .empty-phrase').style.display='flex'
        document.querySelector('.cart-avatar .quantity-products-card').style.display='none'
        document.querySelector('.list-products .product-added').remove()
        document.querySelector('.cart-card .btn-card').classList.toggle('hidden')
        emptyPhraseVisibility=true
    })
}

function updateQuantityProducts(){
    document.querySelector('.quantity-products-card').textContent = quantityProducts
    document.querySelector('.quantity-products .quantity').textContent = quantityProducts
    $template.querySelector('.price-info-cart').innerHTML=`
    $125.00 x ${quantityProducts}<span>$${Number.parseFloat(quantityProducts*125).toFixed(2)}</span> 
    `
    const clone= $template.cloneNode(true)
    if(quantityProducts>0 && emptyPhraseVisibility){
        document.querySelector('.cart-card .list-products .empty-phrase').style.display='none'
        document.querySelector('.cart-avatar .quantity-products-card').style.display='flex'
        document.querySelector('.list-products').appendChild(clone)
        document.querySelector('.cart-card .btn-card').classList.toggle('hidden')
        emptyPhraseVisibility=false
        btnDelete()
    }else if(quantityProducts>0 && !emptyPhraseVisibility){
        document.querySelector('.list-products').replaceChild(clone,document.querySelector('.list-products .product-added'))
        btnDelete()
    }
    if(quantityProducts===0){
        document.querySelector('.cart-card .list-products .empty-phrase').style.display='flex'
        document.querySelector('.cart-avatar .quantity-products-card').style.display='none'
        document.querySelector('.list-products .product-added').remove()
        document.querySelector('.cart-card .btn-card').classList.toggle('hidden')
        emptyPhraseVisibility=true
    }
}


btnPlus.addEventListener('click',e=>{
    quantityProducts++
    updateQuantityProducts()
})
btnMinus.addEventListener('click',e=>{
    if(quantityProducts!==0){
        quantityProducts--
        updateQuantityProducts()
    }
})


const btnMenu  = document.querySelector('.icon-menu'),
btnCloseMenu = document.querySelector('.container-nav-bar svg')

btnMenu.addEventListener('click',e=>{
    document.querySelector('.nav-bar').classList.toggle('d-block')
})

btnCloseMenu.addEventListener('click',e=>{
    document.querySelector('.nav-bar').classList.toggle('d-block')
})