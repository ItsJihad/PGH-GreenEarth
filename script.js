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

const allButtons = document.querySelectorAll(".catbuttons");

const productArea = document.getElementById("productContainer");
const categoryplace = document.getElementById("categoryplace");

const allplantsAPI = "https://openapi.programming-hero.com/api/plants";
const allcategoriesAPI = "https://openapi.programming-hero.com/api/categories";
const plantsbycategoriesAPI =
  "https://openapi.programming-hero.com/api/category/${id}";
const PlantsDetailAPI = "https://openapi.programming-hero.com/api/plant/${id}";

let url;
fetching = (url,id) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const handler = (data) => {
  if ("plants" in data && Array.isArray(data.plants)) {
    data.plants.forEach((plant) => {
      const Divplacer = document.createElement("div");
      Divplacer.innerHTML = "";
      Divplacer.innerHTML = `
            
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
            
            
            `;
      document.getElementById("productContainer").appendChild(Divplacer);
    });
  } else if ("categories" in data && Array.isArray(data.categories)) {
    let Abutton = document.createElement("button");

    Abutton.classList =
      "catbuttons self-stretch px-2.5 py-2 active text-black rounded inline-flex justify-start items-center gap-2.5 font-medium font-['Inter'] text-base hover:bg-green-200 transition-colors duration-300";

    Abutton.innerText = "All Trees";

    Abutton.addEventListener("click", () => {

    const catbuttons = document.querySelectorAll(".catbuttons");
    catbuttons.forEach((button) => button.classList.remove("active"));

   
    Abutton.classList.add("active");
    
    document.getElementById("productContainer").innerHTML=""
    fetching(allplantsAPI).then(handler);
  });

    categoryplace.appendChild(Abutton);

    data.categories.forEach((category) => {
      let Cbutton = document.createElement("button");
      Cbutton.classList =
        "catbuttons self-stretch px-2.5 py-2 bg-[#FFFFF] text-black rounded inline-flex justify-start items-center gap-2.5 font-medium font-['Inter'] text-base hover:bg-green-200 transition-colors duration-300";
      Cbutton.id = category.id;
      Cbutton.innerText = category.category_name;
      categoryplace.appendChild(Cbutton);

      Cbutton.addEventListener("click", () => {
        const catbuttons = document.querySelectorAll(".catbuttons");
        catbuttons.forEach((button) => {
          button.classList.remove("active");
        });
        Cbutton.classList.add("active");
        console.log(category.id)
        
        document.getElementById("productContainer").innerHTML=""

        const url = `https://openapi.programming-hero.com/api/category/${category.id}`;
        console.log("Fetching category:", url);
        fetching(url).then(handler);

      });
    });
  }
};

window.onload = () => {
  fetching(allplantsAPI).then(handler);
  fetching(allcategoriesAPI).then(handler);
};


