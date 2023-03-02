// fetch data 

const loadAI = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    
    const data = await res.json() ;

    displayAI(data.data.tools.slice(0,6) );

}

// display data 

const displayAI =  (data) => {

// console.log(data );

const container =document.getElementById('card-container');

data.forEach(aiDetails => {
    // console.log(aiDetails);

    const div =document.createElement('div');
    div.classList.add("card", "w-96", "bg-base-100", "shadow-xl")

    div.innerHTML=` <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div> ` ;

    container.appendChild(div);


});




}



loadAI();