// fetch data

const loadAI = async () => {
    loader(true);
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

  loader(false);
};


// modal

const loadSingleData = async (id) => {

    
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  
    const data = await res.json();
  
    showSingleData(data.data);
  };


  const showSingleData =(aiData)=> {

      console.log(aiData);

    const modalContainer =document.getElementById('modal-body');
     modalContainer.innerHTML='';

    const{image_link, input_output_examples} =aiData ;

    const div = document.createElement('div');
    div.classList.add("modal-box", "relative", "overflow-visible", "w-11/12" , "max-w-5xl" );
    //   div.innerHTML='';  
    
    div.innerHTML=`
    
    <label for="ai-modal-details" class="btn btn-sm btn-circle absolute -right-4 -top-5  bg-[#EB5757] border-none"> ✕</label>
     
     
       <div class="grid  grid-cols-1  md:grid-cols-2 gap-4  m-10 "> 
  
         
 
         <div>
           
             <div class="card w-full bg-base-100 shadow-xl">
                 
                 <div class="card-body items-center text-center">
                   <h2 class="card-title">Shoes!</h2>
                   <p>If a dog chews shoes whose shoes does he choose?</p>
                   
                 </div>
               </div>
         </div>
 
         
 
 
         <div>
      
             <div class="card w-full bg-base-100 shadow-xl">
                 <figure class="p-5">
                   <img src="${image_link[0] } " alt="Shoes" class="rounded-xl" />
                 </figure>
                 <div class="card-body items-center text-center">
                   <h2 class="card-title">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h2>
                   <p>${input_output_examples ? input_output_examples[0].output.slice(0,80) : 'No! Not Yet! Take a break!!!'}</p>
                   
                 </div>
               </div>
 
 
         </div>
 
      </div> 
 
 
    `

  modalContainer.appendChild(div);

  }








 
// see more 

const seeMore = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  
    const data = await res.json();
  
    const seeMoreBtn = document.getElementById('see-more');
    seeMoreBtn.classList.add('hidden')

    displayAI(data.data.tools);
  };




// spinner 

const loader = isLoading => {

    const load =  document.getElementById("loader") ;

    if( isLoading) {

      load.classList.remove('hidden');
    }
    else {
      load.classList.add('hidden');

    }

 }


// default calling the function 
  loadAI();
