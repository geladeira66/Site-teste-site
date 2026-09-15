const gameContainer=document.querySelector(".container");
const userResult=document.querySelector(".user_result img");
const cpuResult=document.querySelector(".cpu_result img");
const result=document.querySelector(".result");
const optionImages=document.querySelectorAll(".option_image");

optionImages.forEach((image,index)=>{
  image.addEventListener("click",(e)=>{
    if(gameContainer.classList.contains("start")) return;
    image.classList.add("active");
    userResult.src=cpuResult.src="https://codingstella.com/wp-content/uploads/2024/01/download.png";
    result.textContent="Aguarde...";
    optionImages.forEach((image2,index2)=>{
      if(index!==index2) image2.classList.remove("active");
    });
    gameContainer.classList.add("start");

    setTimeout(()=>{
      gameContainer.classList.remove("start");
      const imageSrc=image.querySelector("img").src;
      userResult.src=imageSrc;
      const cpuImages=[
        "https://codingstella.com/wp-content/uploads/2024/01/download.png",
        "https://codingstella.com/wp-content/uploads/2024/01/download-1.png",
        "https://codingstella.com/wp-content/uploads/2024/01/download-2.png"
      ];
      const randomNumber=Math.floor(Math.random()*3);
      cpuResult.src=cpuImages[randomNumber];

      const cpuValue=["R","P","S"][randomNumber];
      const userValue=["R","P","S"][index];
      const outcomes={
        RR:"Empate",RP:"CPU",RS:"Você",
        PP:"Empate",PR:"Você",PS:"CPU",
        SS:"Empate",SR:"CPU",SP:"Você"
      };
      const outcome=outcomes[userValue+cpuValue];
      result.textContent=userValue===cpuValue?"Empate!":`${outcome} venceu!`;
    },1000);
  });
});
