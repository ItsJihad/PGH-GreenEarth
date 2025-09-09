const alltrees = document.getElementById("all-trees");
const fruittrees = document.getElementById("fruit-trees");
const flowering = document.getElementById("flowering-trees");
const shade = document.getElementById("shade-trees");
const medicinal = document.getElementById("medicinal-trees");
const timber = document.getElementById("timber-trees");
const evergreen = document.getElementById("evergreen-trees");
const ornamental = document.getElementById("ornamental-trees");
const bamboo = document.getElementById("bamboo-trees");
const climbers = document.getElementById("climbers-trees");
const aquatic = document.getElementById("aquatic-trees");

const allButtons=document.querySelectorAll(".catbuttons")

const productArea = document.getElementById("productContainer");

const allplantsAPI ="https://openapi.programming-hero.com/api/plants"
const allcategoriesAPI ="https://openapi.programming-hero.com/api/plants"
const plantsbycategoriesAPI ="https://openapi.programming-hero.com/api/plants"
const PlantsDetailAPI ="https://openapi.programming-hero.com/api/plants"



fetching=(url,id)=>{
    fetch(url)
    .then(res=>res.json())
    .then((json)=>producer(json.plants))
    
}


producer=(plants)=>{
        
    for (const plant of plants) {
        
        let placeholder=document.createElement("div")
        placeholder.innerHTML=""

        placeholder.innerHTML=`
        
        <div class="p-4 bg-white rounded-lg flex flex-col gap-3 ">
                <img src="${plant.image}"  class="h-48  rounded-lg">
                <div class="flex gap-3">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="text-gray-800 text-sm font-semibold">${plant.name}</div>
                    <div class="opacity-80 text-gray-800 text-xs leading-none">
                    ${plant.description}
                    </div>
                    <div class="flex items-center gap-2">
                    <div class="px-3 py-1 bg-green-100 rounded-full flex justify-center items-center">
                        <span class="text-green-700 text-sm font-medium">${plant.category}</span>
                    </div>
                    <div class="flex-1 text-right text-gray-800 text-sm font-semibold">৳ ${plant.price}</div>
                    </div>
                </div>
                </div>
                <button class="w-full px-5 py-3 bg-green-700 hover:bg-yellow-300 rounded-full text-white text-base font-medium">
                Add to Cart
                </button>
            </div>
        
        `
        productArea.appendChild(placeholder)

    }

    }

window.onload=()=>(fetching(allplantsAPI))




buttonclick=(tap)=>{
    productArea.innerText=""
    fetching(plantsbycategoriesAPI)
        allButtons.forEach(button=>{
        button.classList.remove("bg-green-700")
        })
        tap.classList.add("bg-green-700")
        tap.classList.remove("hover:bg-green-100")
}

