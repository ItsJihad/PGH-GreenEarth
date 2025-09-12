const productArea = document.getElementById("productContainer");
const categoryplace = document.getElementById("categoryplace");
const spinner = document.getElementById("spinner");

// Reusable Fetch
fetcher = (url) => {
  document.getElementById("spinner").classList.remove("hidden");
  productArea.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      constructor(data);
      document.getElementById("spinner").classList.add("hidden");
    });
};

// Category Constructor {PRODUCT CARDS PLACE HOLDER}

constructor = (data) => {
  if ("plants" in data && Array.isArray(data.plants)) {
    cardsCreator(data.plants);
  } else if ("categories" in data && Array.isArray(data.categories)) {
    ButtonCreator(data.categories);
  }
};

// ALL Tree Single Button
allTrees = () => {
  const allTreesbutton = document.createElement("button");
  allTreesbutton.innerHTML = `
      <button class="categorybuttons active self-stretch px-2.5 py-2 text-black rounded inline-flex justify-start items-center gap-2.5 font-medium font-['Inter'] text-base hover:bg-green-200 transition-colors duration-300">All Trees</button>
    `;
  categoryplace.appendChild(allTreesbutton);
  allTreesbutton.addEventListener("click", () => {
    document.getElementById("productContainer").innerHTML = "";
    fetcher("https://openapi.programming-hero.com/api/plants");
  });
};

// Each Category Button Creator
ButtonCreator = (buttonData) => {
  categoryplace.innerHTML = "";
  allTrees();

  buttonData.forEach((button) => {
    const categorybutton = document.createElement("button");
    categorybutton.classList =
      "categorybuttons  m-2  bg-[#F0FDF9] px-2.5 py-2 font-medium font-['Inter'] text-black rounded hover:bg-green-200 ";
    categorybutton.id = button.id;
    categorybutton.textContent = button.category_name;

    categoryplace.appendChild(categorybutton);
    document
      .getElementById("mobileCategorialmoal")
      .appendChild(categorybutton.cloneNode(true));

    const allButtons = document.querySelectorAll(".categorybuttons");
    ActiveChecker(allButtons);
  });
};

// Button Activity Checker
ActiveChecker = (buttons) => {
  // Active Class Remover
  remover = () => {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  };
  // Button Clicking Function
  buttons.forEach((button) => {
    button.onclick = () => {
      remover();
      button.classList.add("active");

      document.getElementById("productContainer").innerHTML = "";
      fetcher(`https://openapi.programming-hero.com/api/category/${button.id}`);
    };
  });
};

// Cards Creator

cardsCreator = (cardData) => {
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
                <button class=" Addtocart w-full px-5 py-3 bg-green-700 hover:bg-yellow-300 rounded-full text-white text-base font-medium" id="${card.id}">
                Add to Cart
                </button>
            </div>
            `;

    document.getElementById("productContainer").appendChild(Divplacer);
    //modal Creator

    Divplacer.querySelector(".productName").addEventListener("click", () => {
          document.getElementById("modalTitle").innerText = card.name;
          document.getElementById("modalImage").src = card.image;
          document.getElementById("modalCategory").innerText = `Category : ${card.category}`;
          document.getElementById("modalPrice").innerText = `Price : ৳ ${card.price}`;
          document.getElementById("modalDescription").innerText = `Description : ${card.description}`;
          document.getElementById("ModalAddtoCart").innerText = "Add to Cart";

      const modal = document.getElementById("my_modal_1");
      const modalButton = document.getElementById("ModalAddtoCart");
      
      modalButton.replaceWith(modalButton.cloneNode(true));
      const newModalButton = document.getElementById("ModalAddtoCart");

      newModalButton.addEventListener("click", () => {
                productClicker(card);
                addToCalc(card);
                modal.close(); 
            });

      
    });

    // ------------------------------------------Modal Add to cart ---------------------------------

  

    // -----------------------Add to Cart on click on products-----------------------------

    const AddtoCartButtons = Divplacer.querySelectorAll(".Addtocart");
    AddtoCartButtons.forEach((button) => {
      button.onclick = () => {
        productClicker(card);
        addToCalc(card);
      };
    });
  });
};

// --------------------------CART SECTION----------------------------------------

productClicker = (card) => {
  const cartContainer = document.getElementById("cartContainer");
  const newProduct = document.createElement("div");
  newProduct.innerHTML = `

<div class="self-stretch px-3 py-2 m-2 md:m-0 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5" id="${card.id}">
        <div class="flex-1 inline-flex flex-col justify-start items-start gap-1">
          <div class="self-stretch justify-start text-gray-800 text-sm font-semibold font-['Inter'] leading-tight " id="mangoName">${card.name}</div>
          <div class="opacity-50 justify-start text-gray-800 text-base font-normal font-['Inter'] leading-normal mangoPrice">৳<span id="mangoPrice">${card.price}</span> x <span id="mangoQuantity">1</span></div>
        </div>
        <div class="w-4 h-4 relative overflow-hidden mangoCross">
          <div  id="mangoCross" class="  w-2.5 h-2.5 left-[3.33px] top-[3.33px] absolute "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg></div>
        </div>
      </div>

`;
  cartContainer.appendChild(newProduct);

  // ----------------------------Products cloned to Mobile Carts ------------------------------
  const mobilecart = document.getElementById("mobilemodalInside");
  const clonedProduct = mobilecart.appendChild(newProduct.cloneNode(true));
  // ------------------------------------------------------------------------------
  clonedProduct.classList.add("added-to-mobile-items");
  const crossM = clonedProduct.querySelector("svg");

  crossM.addEventListener("click", () => {
    mobilecart.removeChild(clonedProduct);
    cartContainer.removeChild(newProduct);
    removeFromCart(card);
  });

  // -----------------------------------Product Remover -------------------------------------

  const cross = newProduct.querySelectorAll(".mangoCross");
  cross.forEach((cross) => {
    cross.addEventListener("click", () => {
      cartContainer.removeChild(newProduct);
      mobilecart.removeChild(clonedProduct);
      removeFromCart(card);
    });
  });
};

// ---------------------------- Price Calculator FOR PC-------------------------------

total = 0;
addToCalc = (card) => {
  total += card.price;
  alert("Product Added to Cart")
  document.getElementById("mangoTotal").innerText = `৳ ${total}`;
  document.getElementById("mangoInmodal").innerText = `৳ ${total}`;
};

removeFromCart = (card) => {
  total -= card.price;
  document.getElementById("mangoTotal").innerText = `৳ ${total}`;
  document.getElementById("mangoInmodal").innerText = `৳ ${total}`;
  alert("Product Removed From Cart")
  if (total === 0) {
    document.getElementById("mangoTotal").innerText = "৳ 0.00";
    document.getElementById("mangoInmodal").innerText = "৳ 0.00";
  }
};

// Loads on Boot
window.onload = () => {
  fetcher("https://openapi.programming-hero.com/api/plants");
  fetcher("https://openapi.programming-hero.com/api/categories");
};
