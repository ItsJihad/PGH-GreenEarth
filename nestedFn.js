const allButtons = document.querySelectorAll(".catbuttons");
const productArea = document.getElementById("productContainer");
const categoryplace = document.getElementById("categoryplace");

const allplantsAPI = "https://openapi.programming-hero.com/api/plants";
const allcategoriesAPI = "https://openapi.programming-hero.com/api/categories";
const plantsbycategoriesAPI =
  "https://openapi.programming-hero.com/api/category/${id}";
const PlantsDetailAPI = "https://openapi.programming-hero.com/api/plant/${id}";

// ----------------------------------------------------This Is the Fetch Section------------------------------------------------------------------

let url;
fetching = (url, id) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

// ---------------------------------------------------------This Handles Products------------------------------------------------------------------
const handler = (data) => {
  // ----------------------------------------------------This Creates Product-------------------------------------------------------------------
  if ("plants" in data && Array.isArray(data.plants)) {
    data.plants.forEach((plant) => {
      const Divplacer = document.createElement("div");
      Divplacer.innerHTML = "";
      Divplacer.innerHTML = `
            
            <div class="p-4 bg-white rounded-lg flex flex-col gap-3 " id="${plant.id}">
                <img src="${plant.image}"  class="h-48  rounded-lg">
                <div class="flex gap-3">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="text-gray-800 text-sm font-semibold" onclick="my_modal_1.showModal()" >${plant.name}</div>
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
                <button class=" Addtocart w-full px-5 py-3 bg-green-700 hover:bg-yellow-300 rounded-full text-white text-base font-medium">
                Add to Cart
                </button>
            </div>
            
            
            `;
      document.getElementById("productContainer").appendChild(Divplacer);

      // ----------------------------------------------------This Controls the Cart-------------------------------------------------------------------
      const Addtocart = document.querySelectorAll(".Addtocart");
    });

    // ----------------------------------------------------This Category Buttons-------------------------------------------------------------------
  } else if ("categories" in data && Array.isArray(data.categories)) {
    let Abutton = document.createElement("button");

    Abutton.classList =
      "catbuttons self-stretch px-2.5 py-2 active text-black rounded inline-flex justify-start items-center gap-2.5 font-medium font-['Inter'] text-base hover:bg-green-200 transition-colors duration-300";

    Abutton.innerText = "All Trees";

    Abutton.addEventListener("click", () => {
      const catbuttons = document.querySelectorAll(".catbuttons");
      catbuttons.forEach((button) => button.classList.remove("active"));

      Abutton.classList.add("active");

      document.getElementById("productContainer").innerHTML = "";
      fetching(allplantsAPI).then(handler);
    });

    categoryplace.appendChild(Abutton);

    let Abuts = document
      .getElementById("mobileCategorialmoal")
      .appendChild(Abutton.cloneNode(true));

    data.categories.forEach((category) => {
      let Cbutton = document.createElement("button");
      Cbutton.classList =
        "catbuttons self-stretch px-2.5 py-2 bg-green-200  m-2 sm:bg-transparent text-black rounded inline-flex justify-start items-center  font-medium font-['Inter'] text-base hover:bg-green-200 transition-colors duration-300";
      Cbutton.id = category.id;
      Cbutton.innerText = category.category_name;

      categoryplace.appendChild(Cbutton);
      let mobileButton = Cbutton.cloneNode(true);

      document
        .getElementById("mobileCatbuttons")
        .addEventListener("click", () => {
          document
            .getElementById("mobileCategorialmoal")
            .appendChild(mobileButton);
        });

      clicker = (but) => {
        but.addEventListener("click", () => {
          const catbuttons = document.querySelectorAll(".catbuttons");
          catbuttons.forEach((button) => {
            button.classList.remove("active");
          });
          but.classList.add("active");

          document.getElementById("productContainer").innerHTML = "";

          const url = `https://openapi.programming-hero.com/api/category/${category.id}`;
          fetching(url).then(handler);
        });
      };

      clicker(Cbutton);
      clicker(mobileButton);
      clicker(Abuts);

      // Cbutton.addEventListener("click", () => {
      //   const catbuttons = document.querySelectorAll(".catbuttons");
      //   catbuttons.forEach((button) => {
      //     button.classList.remove("active");
      //   });
      //   Cbutton.classList.add("active");

      //   document.getElementById("productContainer").innerHTML = "";

      //   const url = `https://openapi.programming-hero.com/api/category/${category.id}`;
      //   console.log("Fetching category:", url);
      //   fetching(url).then(handler);
      // });
    });
  }
};

// ---------------------------------------------------------------This Loads everything on Boot -----------------------------------------------------
window.onload = () => {
  fetching(allplantsAPI).then(handler);
  fetching(allcategoriesAPI).then(handler);
};

// ---------------------------------------------------Main Modal-----------------------------------------------



modalmaker = (data) => {
 
  const mainModal = document.getElementById("MainModal");
  mainModal.innerHTML = "";
  mainModal.innerHTML = `
    <div class="p-4 bg-white rounded-lg flex flex-col gap-3 " id="${data.id}">
    <div class="text-gray-800 text-2xl font-semibold" onclick="my_modal_1.showModal()" >${data.name}</div>
                <img src="${data.image}"  class="h-48  rounded-lg">
                <div class="flex flex-col gap-3">
                <div class="text-gray-800 text-sm font-semibold" onclick="my_modal_1.showModal()" >Category : ${data.category}</div>
                <div class="flex-1 flex flex-col gap-2">
                  <div class="flex-1 text-left text-gray-800 text-sm font-semibold">৳ Price : ${data.price}</div>
                    </div>
                    <div class="flex flex-col gap-3">
                    <div class="text-gray-800 text-sm font-itallic" onclick="my_modal_1.showModal()" >Description : ${data.description}</div>
                </div>
                </div>
                <button class=" Addtocart w-full px-5 py-3 bg-green-700 hover:bg-yellow-300 rounded-full text-white text-base font-medium">
                Add to Cart
                </button>
            </div>


      `;
};
