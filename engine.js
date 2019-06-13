// singleton pattern
var environement = (function(){
    var instantiated;
    if(!instantiated){
        instantiated = {
           gravity : 9.8 ,
           windSpeed : 0.1 , 
           winDeriction: 'east'
        }
    }
    return instantiated;
})(); 
