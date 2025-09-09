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
const categoryplace = document.getElementById("categoryplace");

const allplantsAPI ="https://openapi.programming-hero.com/api/plants"
const allcategoriesAPI ="https://openapi.programming-hero.com/api/plants"
const plantsbycategoriesAPI ="https://openapi.programming-hero.com/api/plants"
const PlantsDetailAPI ="https://openapi.programming-hero.com/api/plants"
const categoriesAPI ="https://openapi.programming-hero.com/api/categories"





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





categoryFetch=(url)=>{
    fetch(url)
    .then(res=>res.json())
    .then((json)=>categorybuttons(json.categories))
    
}








categorybuttons=(categories)=>{
        for (const category of categories) {
            
            let catbutton = document.createElement("button")
            catbutton.innerText=""
            catbutton.classList="self-stretch px-2.5 py-2 bg-[#F0FDF4] text-black rounded  justify-center items-center gap-4 font-medium font-['Inter'] text-start hover:bg-green-600 transition-colors duration-300 "

            catbutton.innerText=category.category_name
        
            categoryplace.appendChild(catbutton)
        
        
        document.getElementById("categoryplace").appendChild(catbutton)
       
            
        
            
        }
        
        
}











window.onload = () => {
    categoryFetch(categoriesAPI);
    fetching(allplantsAPI);
};

