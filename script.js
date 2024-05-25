const addElementButton = document.querySelector("#addElementButton")
const rightPanel = document.querySelector("#rightPanel")
const closeElementButton = document.querySelector("#closeElementButton")

const createDataBlock = document.querySelector("#createDataBlock")

const dataBlockName = document.querySelector("#dataBlockName")
const dataBlockSymbol = document.querySelector("#dataBlockSymbol")
const dataBlockComment = document.querySelector("#dataBlockComment")
const dataBlockValue = document.querySelector("#dataBlockValue")

const heroMain = document.querySelector("#heroMain")

const categories = document.querySelector("#categories")


const groupName = document.querySelector("#groupName")
const groupSymbol = document.querySelector("#groupSymbol")
const createGroupButton = document.querySelector("#createGroup")



const blockGroupName = document.querySelector("#blockGroupName")
const blockName = document.querySelector("#blockName")
const blockDate = document.querySelector("#blockDate")
const createGroupBlockButton = document.querySelector("#createGroupBlock")

const subtitle = document.querySelector("#subtitle")

const dropDown = document.querySelector("#dropDown")

let groups = {
    Фрукты:{
        Яблоки:`<div class="main_element">
        <div class="element_header">
            <div class="element__title">Цена</div>
            <div class="element__symbol">$</div>
        </div>
        <div class="element__value">
            200
        </div>
        <div class="element__comment">
            Вышло ниже чем я думал
        </div>
        </div>`
    }
}

let currentCategory = {
    group : "Фрукты",
    block : "Яблоки"
}

addElementButton.addEventListener("click", ()=>{
    rightPanel.style.right = "0px"
})

closeElementButton.addEventListener("click", ()=>{
    rightPanel.style.right = "-50%"
})

function addElement(type, name, symbol, value, comment) {
    if (type == "dataBlock") {
        return `
        <div class="main_element">
            <div class="element_header">
                <div class="element__title">`+name+`</div>
                <div class="element__symbol">`+symbol+`</div>
            </div>
            <div class="element__value">`+value+`</div>
            <div class="element__comment">
                `+comment+`
            </div>
            <div class="remove_element__button">
                <img src="images/trash.png" alt="">
            </div>
        </div>
        `
    }else if(type == "diagram"){
        []
    }else{
        alert("Не удалось создать объект")
    }
}

function addGroup(name, symbol) {
    groups[name] = {}
    categories.innerHTML += `
    <div class="categories_list" id="`+name+`">
        <span class="categories__name">`+name+`</span>
    </div>
    `
}

function addGroupBlock(groupName, name) {
    groups[groupName][name] = ""
    categories.querySelector("#"+groupName).innerHTML += `
    <div class="categories__element">`+name+`</div>
    `
}

function generateRandomColor() { 
    var letters = '0123456789ABCDEF'; 
    var color = '#'; 
    for (var i = 0; i < 6; i++) { 
        color += letters[Math.floor(Math.random() * 16)]; 
    } 
    return color; 
} 

createDataBlock.addEventListener("click", ()=>{
    if(dataBlockName.value != "" ||
        dataBlockSymbol.value != "" ||
        dataBlockValue.value != ""
    ){
        heroMain.innerHTML += addElement("dataBlock", dataBlockName.value, dataBlockSymbol.value, dataBlockValue.value, dataBlockComment.value)
    }
    [dataBlockName, dataBlockSymbol, dataBlockValue, dataBlockComment].forEach(element =>{element.value = ""})
    groups[currentCategory["group"]][currentCategory["block"]] = heroMain.innerHTML
})

categories.addEventListener("click", (event)=>{
    if (Array.from(event.target.classList).includes("categories__element")) {
        Array.from(categories.children).forEach(element =>{
            Array.from(element.children).forEach(child =>{
                child.classList.remove("active")
            })
        })
        event.target.classList.add("active")
        currentCategory.block = event.target.textContent
        currentCategory.group = event.target.parentElement.querySelector(".categories__name").textContent
        heroMain.innerHTML = groups[currentCategory["group"]][currentCategory["block"]]
        subtitle.textContent = currentCategory["group"] + "/" + [currentCategory["block"]]
    }
})

createGroupButton.addEventListener("click", ()=>{
    addGroup(groupName.value, groupSymbol.value)
})

createGroupBlockButton.addEventListener("click", ()=>{
    addGroupBlock(blockGroupName.value, blockName.value)
})

dropDown.addEventListener("click", (event)=>{
    if(Array.from(event.target.parentElement.classList).includes("drop_down")){
        Array.from(event.target.parentElement.parentElement.children).forEach(element =>{
            element.querySelector(".drop_down_content").classList.remove("drop_down_active")
            console.log(element);
        })
        event.target.parentElement.querySelector(".drop_down_content").classList.toggle("drop_down_active")
    }
})

let modeDiagramSelected = undefined

heroMain.addEventListener("click", (event)=>{
    console.log(event.target);
    if (Array.from(event.target.classList).includes("remove_element__button")) {
        event.target.parentElement.remove()
        groups[currentCategory["group"]][currentCategory["block"]] = heroMain.innerHTML
    }else if (Array.from(event.target.parentElement.classList).includes("remove_element__button")) {
        event.target.parentElement.parentElement.remove()
        groups[currentCategory["group"]][currentCategory["block"]] = heroMain.innerHTML
    }

    if (Array.from(event.target.classList).includes("diagram_injector")) {
        modeDiagramSelected = event.target.parentElement
        console.log(modeDiagramSelected);
    }else if(Array.from(event.target.parentElement.classList).includes("diagram_injector")){
        modeDiagramSelected = event.target.parentElement.parentElement
    }
})

let tempDiagramMax = 0
let tempDiagramMin = 0

document.addEventListener("click", (event)=>{
    if (modeDiagramSelected != undefined) {
        if (!Array.from(event.target.classList).includes("main_element") && !modeDiagramSelected.contains(event.target)) {
            modeDiagramSelected = undefined
        }else{
            if (!modeDiagramSelected.contains(event.target)) {
                console.log(event.target.querySelector(".element__value").textContent);
                let randomColor = generateRandomColor()
                event.target.style.border ="3px solid " + randomColor
                tempDiagramMax += +event.target.querySelector(".element__value").textContent
                console.log((+event.target.querySelector(".element__value").textContent/tempDiagramMax * 100), (+event.target.querySelector(".element__value").textContent/tempDiagramMin * 100));
                modeDiagramSelected.querySelector(".chart").innerHTML += '<circle class="unit" r="15.9" cx="50%" cy="50%" style="stroke:'+randomColor+'; stroke-dasharray: '+Math.round((+event.target.querySelector(".element__value").textContent/tempDiagramMax * 100))+' '+tempDiagramMax+'; stroke-dashoffset: '+tempDiagramMin+'"></circle>'
                tempDiagramMin += Math.round((+event.target.querySelector(".element__value").textContent/tempDiagramMax * 100))
                modeDiagramSelected = undefined
            }
        }
    }
})