const mainImage = document.getElementById("main-image"),
btnCloseModal =document.getElementById("close-modal"),
mainImageModal = document.getElementById("main-image-modal")


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

othersImage.forEach(otherImage=>{
    otherImage.addEventListener('click',e=>{
        const selectedImages = document.querySelectorAll(".selected")
        if(!e.target.classList.contains('selected')){
            mainImage.querySelector('img').setAttribute("src",e.target.querySelector('img').dataset.image)
            mainImageModal.querySelector('img').setAttribute("src",e.target.querySelector('img').dataset.image)
            selectedImages.forEach(el=>{
                el.classList.toggle("selected")
            })
            const imagesTarget = [...othersImage].filter(el=>{
                return el.querySelector('img').getAttribute("src")==e.target.querySelector('img').getAttribute('src')
            })
            imagesTarget.forEach(el=>el.classList.add("selected"))
        }
    })
})