let cardData =[];

// fetch data

const loadAI = async () => {
    loader(true);
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");

  const data = await res.json();

  displayAI(data.data.tools.slice(0, 6));
  cardData= data.data.tools.slice(0, 6) ;
  
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
                     

                     <label onclick="loadSingleData('${id}')" for="ai-modal-details" ><span  class="text-[#EB5757] p-5 bg-red-50 rounded-full">
                     <i    class="fa-solid fa-arrow-right" ></i
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

    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  
    const data = await res.json();
  
    showSingleData(data.data);
  };


  const showSingleData =(aiData)=> {

    //   console.log(aiData);

    const modalContainer =document.getElementById('modal-body');
     modalContainer.innerHTML='';

    const{image_link, input_output_examples,accuracy,description,pricing, features, integrations} =aiData ;

    // const div = document.createElement('div');
    // div.classList.add("modal-box", "relative", "overflow-visible", "w-full" , "max-w-5xl" ,"max-h-fit"  );
    //   div.innerHTML='';  
    
    modalContainer.innerHTML=`
    
    <label for="ai-modal-details" class="btn btn-sm btn-circle absolute  z-10 right-2 top-2   md:-right-4 md:-top-5  bg-[#EB5757] border-none"> ✕</label>
     
     
       <div class="grid  grid-cols-1  md:grid-cols-2 gap-4 z-1  "> 
  
         
 
         <div>
           
             <div class="card w-full bg-red-100 shadow-xl p-6">
                 
                 
                   <h1 class=" font-bold text-xl ">${description.slice(0,100)}</h1>
                   <div class="grid grid-cols-3 gap-2 mt-4 mb-4">

       <div class="bg-white text-[#03A30A] p-3 rounded-lg"><P >${pricing? pricing[0].price :"Free of Cost"  }</P>
        <p>${pricing? pricing[0].plan :"Basic"  }</p>
    </div>
       <div class="bg-white text-[#F28927] p-2 rounded-lg"><P >${pricing? pricing[1].price :"Free Of Cost/"  }</P>
        <p>${pricing? pricing[1].plan :"Pro"  }</p>
    </div>
       <div class="bg-white text-[#EB5757] p-3 rounded-lg"><P >${pricing? pricing[2].price.slice(0,10) :"Free of Cost /"  }</P>
        <p>${pricing? pricing[2].plan :"Enterprise"  }</p>
    </div>
       
           </div>
               
           
           <div class="grid grid-cols-2 ">

      <div>
     <h1 class=" font-bold text-xl ">Features</h1>
       <ul id="features" class="list-disc list-inside">
        
       </ul>
      </div>

      
      <div>
        <h1 class=" font-bold text-xl ">Integrations</h1>
        <ul id ="integration" class="list-disc list-inside">
            
           </ul>
      </div>

    </div>
                 
               </div>
         </div>
 
         
 
 
         <div>
      
             <div class="card w-full bg-base-100 shadow-xl">
                 <figure class="p-5 relative">
                   <img src="${image_link[0] } " alt="Shoes" class="rounded-xl" />
                   <div class="badge badge-primary absolute right-2 top-1 bg-[#EB5757] border-none ${accuracy.score?  "block" :"hidden" } ">${accuracy.score? accuracy.score + " accuracy"  :"not available" }  </div>
                 </figure>
                 <div class="card-body items-center text-center">
                   <h2 class="card-title">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h2>
                   <p>${input_output_examples ? input_output_examples[0].output.slice(0,80) : 'No! Not Yet! Take a break!!!'}</p>
                   
                 </div>
               </div>
 
 
         </div>
 
      </div> 
 
 
    `
    // integrations
    const ul =document.getElementById('integration');

    if(integrations) {

   ul.innerHTML =``
   integrations.forEach(list =>{
ul.innerHTML +=`<li> ${list} </li>`

   })


    } else {

       ul.innerHTML =`Data Not Found` 
    }

    // features


   const  ulFeature=  document.getElementById('features')

    let featureList = features;

    
for (let prop in featureList) {
    ulFeature.innerHTML +=`<li> ${featureList[prop].feature_name} </li>`
}




//   modalContainer.innerHTML=div.innerHTML;

  }








 
// see more 

const seeMore = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  
    const data = await res.json();
  
    const seeMoreBtn = document.getElementById('see-more');
    seeMoreBtn.classList.add('hidden')

    displayAI(data.data.tools);
    cardData= data.data.tools ;

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


// sorting by date 

const  sorted =() =>{

    loader(true);

    const sorting = (a,b) =>{

       const dateA =new Date(a.published_in) ;
       const dateB =new Date(b.published_in) ;

       if(dateA < dateB){

        return 1;
       } else if (dateA > dateB){
        return -1 ;
       } else {

        return 0 ;
       }


    };


    displayAI(cardData.sort(sorting))

};




// default calling the function 
  loadAI();
