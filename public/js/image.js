//This file handles the JS for the image slide on the home page. 

//Declaring Variables 
let sliderImages = document.querySelectorAll('.slide');
let current = 0; 

//Clear all images 
function reset() {

  for(var i = 0; i < sliderImages.length; i++){
    sliderImages[i].style.display = 'none';
  }
}

//Starts slider
function startSlide() {
  reset();
  sliderImages[0].style.display = 'block';
}

startSlide();

window.onload = function(){
   setInterval(function(){
      reset();
      if (current === 0){
        sliderImages[current].style.display = 'block';
        current++;
      }else if (current === 1){
        sliderImages[current].style.display = 'block';
        current++;
      }else if (current === 2){
        sliderImages[current].style.display = 'block';
        current = 0;
      }

   }, 4000);
};
