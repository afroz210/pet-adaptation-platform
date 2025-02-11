let copyPetData = [];
// load pet category
const loadPetCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayPetCategories(data.categories))
    .catch((error) => console.log(error));
};
// display pet category and create button
const displayPetCategories = (categories) => {
  const petCategoryContainer = document.getElementById("pet-categories");
  categories.forEach((item) => {
    //console.log("item", item);

    const petButtonContainer = document.createElement("div");

    petButtonContainer.innerHTML = `
        <button id="btn-${item.id}" class="btn category-btn bg-white md:w-[200px] w-[150px] md:h-[80px] font-bold md:text-[24px] text-[18px] border-solid" onclick=selectedPetCategories("btn-${item.id}","${item.category}")><img class="md:w-[40px] w-[25px] " src=${item.category_icon} alt="">${item.category} </button>
        `;
    petCategoryContainer.append(petButtonContainer);
  });
};

// button active and rounded button add
const selectedPetCategories = (btnId, category) => {
  document.getElementById("spine-div-id").style.display = "block";
  document.getElementById("petAllData-id").style.display = "none";

  removePetClass();
  //console.log("category: ", category);

  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log("pet category: ", data.data);

        const activeBtn = document.getElementById(btnId);
        activeBtn.classList.add("active");
        displayAllPetData(data.data);
      });
  }, 2000);
};
//  button removing
const removePetClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  //console.log("button msg:", buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// load all pet data
const loadAllPetData = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await response.json()
    displayAllPetData(data.pets)
};
// display all pet data
const displayAllPetData = (pets) => {
  copyPetData = pets;
  document.getElementById("spine-div-id").style.display = "none";
  document.getElementById("petAllData-id").style.display = "block";

  //console.log("pet: ", pets);
  const allPetDataContainer = document.getElementById("pet-data-id");

  allPetDataContainer.classList.remove("grid");

  allPetDataContainer.textContent = ""; // faka list

  if (pets.length == 0) {
    allPetDataContainer.innerHTML = `
    <div class="w-full flex flex-col gap-5 justify-center items-center px-20 py-8">
    <img src="./images/error.webp"/>
    <h1 class="text-[32px] font-[700]">No Information Available</h1>
    <p class="text-[#545151b3] text-center">
       It is a long established fact that a reader will be distracted by the readable content of a page when looking at
       its layout. The point of using Lorem Ipsum is that it has a.
    </p>
    </div>
    `;
  } else {
    pets.forEach((item) => {
      allPetDataContainer.classList.add("grid");
      const allPetCardContainer = document.createElement("div");

      allPetCardContainer.innerHTML = `
        
        <div id="petData-${
          item.petId
        }" class="border-solid border-2 px-6 py-6 rounded-xl md:w-[342px]">
                <img class="rounded-lg w-[300px] h-[180px] object-cover" src=${
                  item.image
                } alt="">
                <h2 class="text-[20px] font-[700] mt-2">${item.pet_name}</h2>
                <p class="text-gray-500"><i class="fa-solid fa-border-all"></i> Breed: ${
                  item.breed ? item.breed : "Not Available"
                }</p>
                <p class="text-gray-500"><i class="fa-regular fa-calendar"></i> Birth:  ${
                  item.date_of_birth ? item.date_of_birth : "Not Available"
                }</p>
                <p class="text-gray-500"><i class="fa-solid fa-venus"></i> Gender: ${
                  item.gender ? item.gender : "Not Available"
                }</p>
                <p class="text-gray-500"><i class="fa-solid fa-dollar-sign"></i> Price:  ${
                  item.price
                }</p>
                <hr>
                <div class="flex justify-between mt-4">
                <button onclick=displayPetImage("${item.image}") class="btn adobt-hover bg-white"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button id="adobt-${item.petId}" onclick=displayMessage("adobt-${item.petId}") class="btn adobt-hover bg-white text-[#0E7A81]">Adobt</button>
                  <button onclick=loadshowModal("${
                    item.petId
                  }") class="btn adobt-hover bg-white text-[#0E7A81]">Details</button>
                </div>
              </div>

        `;
      allPetDataContainer.append(allPetCardContainer);
    });
  }
};

// adobt modal
const displayMessage = (id) => {
  document.getElementById(id).disabled = true;
  document.getElementById(id).innerText = 'Adopted';
  let counter = 3;
  const adobtContainer = document.getElementById("modal-content-id2");
  adobtContainer.innerHTML = `
            <div class="modal-content">
              <div class="text-center py-6">
                <img class="w-24 ml-[180px]" src="./images/handshake.png"/>
                <h1 class="font-[900] text-[40px]">Congrates!</h1>
                <p>Adoptation Process is Start For your Pet</p>
              </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
               <div class="md:mr-[200px] mr-[120px]">
                <span class="countdown font-mono text-6xl">
                  <span class="font-bold" style="--value:${counter};"></span>
                </span>
               </div>
              </form>
            </div>
          `;

  document.getElementById("customModal2").showModal();

  const myInterval = setInterval(myTimer, 1000);
  //console.log('myInterval: ',myInterval);
  function myTimer() {
    counter --;
    adobtContainer.innerHTML = `
            <div class="modal-content">
              <div class="text-center py-6">
                <img class="w-24 ml-[180px]" src="./images/handshake.png"/>
                <h1 class="font-[900] text-[40px]">Congrates!</h1>
                <p>Adoptation Process is Start For your Pet</p>
              </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                 <div class="md:mr-[200px] mr-[120px]">
                <span class="countdown font-mono text-6xl">
                  <span class="font-bold"style="--value:${counter};"></span>
                </span>
                </div>
              </form>
            </div>
          `;
    if(counter <= 1) {
      //console.log('counter: ',counter);
      clearInterval(myInterval);
      document.getElementById("customModal2").close();
    }
  }
};


// load dtail modal
const loadshowModal = (petId) => {
  //console.log("pet modal :", petId);
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayModal(data.petData))
    .catch((error) => console.log(error));
};

// show dtail modal
const displayModal = (petData) => {
  const modalContainer = document.getElementById("modal-content-id");
  modalContainer.innerHTML = `
    <div id="petData-${
      petData.petId
    }" class="border-solid border-2 px-6 py-6 rounded-xl">
                <img class="rounded-lg w-[600px] h-[250px] object-cover" src=${
                  petData.image
                } alt="">
                <h2 class="text-[20px] font-[700] mt-2">${petData.pet_name}</h2>
                <div class="grid grid-cols-2">
                <p class="text-gray-500"><i class="fa-solid fa-border-all"></i> Breed: ${
                  petData.breed ? petData.breed : "Not Available"
                }</p>
                <p class="text-gray-500"><i class="fa-regular fa-calendar"></i> Birth:  ${
                  petData.date_of_birth
                    ? petData.date_of_birth
                    : "Not Available"
                }</p>
                <p class="text-gray-500"><i class="fa-solid fa-venus"></i> Gender: ${
                  petData.gender ? petData.gender : "Not Available"
                }</p>
                <p class="text-gray-500"><i class="fa-solid fa-dollar-sign"></i> Price:  ${
                  petData.price
                }</p>
                <p class="text-gray-500"><i class="fa-solid fa-venus"></i> Price:  ${
                  petData.vaccinated_status
                    ? petData.vaccinated_status
                    : "Not Available"
                }</p>
                </div>
                <hr class="mt-4 mb-4">
                <h3 class="font-[600]">Details Information</h3>
                <p>${petData.pet_details}</p>
              </div>
  `;
  document.getElementById("customModal").showModal();
};

// thumb click then pic add
const displayPetImage = (image) => {
  //console.log("imagesss:", image);
  const imageContainer = document.getElementById("pet-img-container");
  const imageCard = document.createElement("div");
  imageCard.innerHTML = `
  <img class="w-[150px] h-[100px] rounded-lg" src=${image}/>
  `;
  imageContainer.append(imageCard);
};

// sort by price
const sortByPrice = () =>{
 // console.log("Copy pet data :",copyPetData)
  copyPetData.sort(function(a,b){
     return b.price - a.price;
  });
  //console.log("Sort pet data :",copyPetData)
  displayAllPetData(copyPetData);
}

setTimeout(() => {
  loadAllPetData();
}, 2000);

loadPetCategories();
