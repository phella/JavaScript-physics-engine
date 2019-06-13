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

// Observer pattern
// pubsub system that stores events with related objects and functions
// needs unit testing
var pubsub = {};
(function(q){
    // all events object(array)
    var topics ={};
    
    // publish event
    q.publish=function(topic,args){
        // no such an event
        if(topics[topic] === undefined)
            return false;
        // invoke all functions on subscribed objects
        topics[topic].subscribers.forEach(element => {
            func = element.func;
            element.obj[0].func(args);
        });
    };

    // subscribe to event
    //boolean function to asure that subscribetion is sucessfull
    q.subscribe = function(topic,obj,func,option = false) {
        // initialize event if first subscriber
        if(!topics[topic]) {
            topics[topic]={subscribers:[] ,preventDub:option};
        }
        // prevent duplication if already subscribed
        else if(option){
            topics[topic].forEach(element => {
                if(element.subscribers.obj[0] === obj)
                    return false;
            }); 
        }
        topics[topic].subscribers.push({
            // object by reference
            obj:[obj],
            func:func
        });
        return true;
    };

    //unsubscribe from event
    //object unsubscribe from all subscribtion to event
    q.unsubscribe = function(topic,obj){
        //prevent duplication
        const option = topics[topic].preventDub;
        for(let i =0;i<topics[topic].subscribers.length;i++){
            if(topics[topic].subscribers[i].obj[0] === obj){
                topics[topic].subscribers.splice(i,1);
                // prevent duplication
                if(option){
                    return;
                }
            }
        }
    }
})(pubsub);
