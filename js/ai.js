// fetch data

const loadAI = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");

  const data = await res.json();

  displayAI(data.data.tools.slice(0, 6));
};

// display data

const displayAI = (data) => {
  // console.log(data );

  const container = document.getElementById("card-container");
  container.innerHTML="";

  data.forEach((aiDetails) => {
    // console.log(aiDetails);

    const div = document.createElement("div");
    div.classList.add(
      "card",
      "w-full",
      "bg-base-100",
      "shadow-xl",
      "p-5",
      "border"
    );

    const { image, features, name, published_in ,id } = aiDetails;

    div.innerHTML = ` <figure><img class="rounded-lg " src=${image} alt="Shoes" /></figure>
    <h1 class="text-2xl font-bold my-2">Features</h1>

    <div class="mb-4 text-[#585858]">
                    <p>1.${features[0]}</p>
                    <p>2.${features[1]}</p>
                    <p>3.${features[2]? features[2]:'Not available'}</p>
                    <p>4.${features[3]? features[3]:'Not available'}</p>
                    
                    
                   </div>

                   <hr>
                   <div class="flex  items-center place-content-between">
                   <div>
                     <h1 class="text-2xl font-bold my-4">${name}</h1>
                     <div class="flex flex-row gap-3">
                       <div class=" text-[#585858]"><i class="fa-solid fa-calendar-days"></i></div>
                       <div><h1 class="text-base text-[#585858]">${published_in}</h1></div>
                       
                     </div>
                   </div>
       
                   <div >
                     

                     <label for="ai-modal-details" ><span  class="text-[#EB5757] p-5 bg-red-50 rounded-full">
                     <i  onclick="loadSingleData('${id}')"  class="fa-solid fa-arrow-right" ></i
                     ></span></label>

                   </div>
                 </div>
    
    `;

    container.appendChild(div);
  });

  
};


// modal

const loadSingleData = async (id) => {

    
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  
    const data = await res.json();
  
    showSingleData(data.data);
  };


  const showSingleData =(aiData)=> {

      console.log(aiData);

  }








 
// see more 

const seeMore = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  
    const data = await res.json();
  
    const seeMoreBtn = document.getElementById('see-more');
    seeMoreBtn.classList.add('hidden')

    displayAI(data.data.tools);
  };

// default calling the function 
  loadAI();
