// fetch data 

const loadAI = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    
    const data = await res.json() ;

    console.log(data.data );

}

loadAI();