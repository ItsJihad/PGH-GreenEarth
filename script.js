const productArea = document.getElementById("productContainer");
const categoryplace = document.getElementById("categoryplace");
const spinner = document.getElementById("spinner");

// Reusable Fetch
fetcher=(url)=>{
  document.getElementById("spinner").classList.remove("hidden");
  productArea.innerHTML = "";
  fetch(url)
  .then(res=>res.json())
  .then((data)=>{
    constructor(data)
  document.getElementById("spinner").classList.add("hidden")
  
  })
  
  
}

// Category Constructor {PRODUCT CARDS PLACE HOLDER}

constructor=(data)=>{
  if ("plants" in data && Array.isArray(data.plants)) {
    cardsCreator(data.plants)
  }else if ("categories" in data && Array.isArray(data.categories)){
    ButtonCreator(data.categories)
  }
}

// ALL Tree Single Button
allTrees=()=>{
  const allTreesbutton=document.createElement("button")
    allTreesbutton.innerHTML=`
      <button class="categorybuttons active self-stretch px-2.5 py-2 text-black rounded inline-flex justify-start items-center gap-2.5 font-medium font-['Inter'] text-base hover:bg-green-200 transition-colors duration-300">All Trees</button>
    `
  categoryplace.appendChild(allTreesbutton)
  allTreesbutton.addEventListener("click",()=>{
    document.getElementById("productContainer").innerHTML = ""
    fetcher("https://openapi.programming-hero.com/api/plants")
    
  })
}


// Each Category Button Creator
ButtonCreator=(buttonData)=>{

  categoryplace.innerHTML = ""
  allTrees()

  buttonData.forEach((button)=>{

   
    const categorybutton=document.createElement("button")
    categorybutton.classList = "categorybuttons  m-2 sm:m-0 bg-[#F0FDF9] px-2.5 py-2 font-medium font-['Inter'] text-black rounded hover:bg-green-200 ";
    categorybutton.id = button.id;
    categorybutton.textContent = button.category_name;

    categoryplace.appendChild(categorybutton)
    document.getElementById("mobileCategorialmoal").appendChild(categorybutton.cloneNode(true))

  const allButtons = document.querySelectorAll(".categorybuttons");
  ActiveChecker(allButtons)
  
 
  })

}

// Button Activity Checker
ActiveChecker=(buttons)=>{
  // Active Class Remover
    remover=()=>{
      buttons.forEach(button=>{
      button.classList.remove("active")
    })
    }
// Button Clicking Function
    buttons.forEach(button=>{
      
      button.onclick=()=>{
        remover()
        button.classList.add("active")

    document.getElementById("productContainer").innerHTML = "";
      fetcher(`https://openapi.programming-hero.com/api/category/${button.id}`);
      
      }
    })

}

//Modal Pop Up




// Cards Creator

cardsCreator=(cardData)=>{


  cardData.forEach((card) => {
    
      const Divplacer = document.createElement("div");
      Divplacer.innerHTML = "";
      Divplacer.innerHTML = `
            
            <div class="p-4 bg-white rounded-lg flex flex-col gap-3 " id="${card.id}">
                <img src="${card.image}"  class="h-48  rounded-lg">
                <div class="flex gap-3">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="productName text-gray-800 text-sm font-semibold" onclick="my_modal_1.showModal()" >${card.name}</div>
                    <div class="opacity-80 text-gray-800 text-xs leading-none">
                    ${card.description}
                    </div>
                    <div class="flex items-center gap-2">
                    <div class="px-3 py-1 bg-green-100 rounded-full flex justify-center items-center">
                        <span class="text-green-700 text-sm font-medium">${card.category}</span>
                    </div>
                    <div class="productPrice flex-1 text-right text-gray-800 text-sm font-semibold">৳ ${card.price}</div>
                    </div>
                </div>
                </div>
                <button class=" Addtocart w-full px-5 py-3 bg-green-700 hover:bg-yellow-300 rounded-full text-white text-base font-medium">
                Add to Cart
                </button>
            </div>
            `;


 Divplacer.querySelector(".productName").addEventListener("click", () => {
      document.getElementById("modalTitle").innerText = card.name;
      document.getElementById("modalImage").src = card.image;
      document.getElementById("modalCategory").innerText = "Category: " + card.category;
      document.getElementById("modalPrice").innerText = "৳ " + card.price;
      document.getElementById("modalDescription").innerText = card.description;

      document.getElementById("my_modal_1").showModal();
    });




            
      document.getElementById("productContainer").appendChild(Divplacer);
      // ----------------------------
      

    });
  
     
}

// Spinner

// bootAnimation=()=>{
//   document.getElementById("spinner").classList.remove("hidden")
//   document.getElementById("spinner").classList.add("hidden")
// }

// Loads on Boot
window.onload=()=>{
  fetcher("https://openapi.programming-hero.com/api/plants")
  fetcher("https://openapi.programming-hero.com/api/categories")
  
}