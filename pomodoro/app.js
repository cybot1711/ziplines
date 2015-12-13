//Lets get ready for the logic. I decided on jquery for this one as I am comfortable using it.
$(document).ready(function() {
     
    $(".container-fluid").css("min-height",$(window).height()+"px");
    //Declare variables for use in the timer
    var interval = 25;//Pomodoro interval
    var breakT = 5;//Break time 
    var wav = 'http://soundbible.com/grab.php?id=2084&type=wav'; //Retrieve soundfile from soundbible
    var audio = new Audio(wav);// Store sound file in audio varible
   
    //$(".break2").html(interval);
    //$(".break1").html(breakT);
    //Aditional variables for calculations
    var intervalVal = interval;
    var breakTVal = breakT;
    var elapsed = 0;//To hold seconds elapsed for every 1000ms
    //Click to decrease break value
    $(".leftclick").click(function() {
        if(breakT > 0) {
        breakT--;
            
        $(".break1").html(breakT);
        breakTVal = breakT;
        //if(breakT > 9){    
        //$(".minutes").html(breakTVal);
        //} else{
        //$(".minutes").html("0" + breakTVal);
        //}
      }
        
    });
    //Click to increase break value
    $(".rightclick").click(function() {
        breakT++;//Increment with click
        breakTVal = breakT;//Update working variable
        $(".break1").html(breakT);//Update html
        
    });
    //Click to decrease break value
    $(".leftclick2").click(function() {
        if(interval > 0) { //Control to prevent negative values
        //Decrement work interval    
        interval--;
        //Update html    
        $(".break2").html(interval);
        //Update working variable    
        intervalVal = interval;
        if(interval > 9){  //Add leading zero  
        $(".minutes").html(intervalVal);
        } else{
        $(".minutes").html("0" + intervalVal);
        }
      }
    });
    //Increase work interval value
     $(".rightclick2").click(function() {
        //Increment work variable
        interval++;
        //Update html
        $(".break2").html(interval);
        //Update working variable 
        intervalVal = interval;
        //Update html 
        $(".minutes").html(intervalVal);
        
    });
    
   
    //Start timer click
    $(".begin").click(function() {
        //Change text forinstructive purposes
        $("#start").html("Work!");
        //Call startTimer function       
        startTimer();          

    }); 
    
    //Reset timer with click
    $(".reset").click(function() {
        //Call reset function
        reset();
    });
    
    //Stop or pause timer with click
    $("#stop").click(function(){
        //Call stop function
       stop(); 
    });
    
    //Stop function calls clearInterval()
    function stop() {
        //Update information
        $("#start").html("Resume");
        //Call clearInterval function
        clearInterval(t);
        
    }
    
    //Reset Timer to original state
    function reset(){
        //Update html 
       $("#start").html("Start");
       //Update working variables 
       breakTVal = breakT
       intervalVal = interval;
       elapsed = 0;
       //Update html with defaults    
       $(".break2").html(interval);
       $(".break1").html(breakT);
       $(".minutes").html(intervalVal);
       $(".seconds").html("0" + "0");
        clearInterval(t);
 
    }
    
    
    //Timer start function
    function startTimer(){
         //Update information on start
         $("#start").html("Work!");
      //Create interval to implement timer 
      t = setInterval(function() {
             //Add leading zero if value is less than 10          
             if (elapsed > 9) {
             $(".seconds").html(elapsed);
             } else {
                 $(".seconds").html("0" + elapsed);
             }
             //After 60 seconds decrement minutes
             if(elapsed == 0)
             {
                 intervalVal--;
                 //Add leading zero if value is less than 10
                 if (interval > 9){
                 //Update html    
                 $(".minutes").html(intervalVal);
                     
                 } else{
                     //Update html
                     $(".minutes").html("0" + intervalVal);
                     
                 }
                 elapsed = 59; //reset seconds after 60 seconds
             } else if(intervalVal == 0 && elapsed == 1) {
                        
                        //Stop timer, play sound, reset and start break Timer
                        clearInterval(t);
                        
			            audio.play();
                 
                        reset();
                        
                        breakTimer();
               } else {
                   //Decrement seconds
                   elapsed--;
                   
               }
      
                         
             
         },1000);
        
    }
    
    //The same as previous function for interval with values for break
    function breakTimer() {
         
         $("#start").html("Break");
         b  = setInterval(function() {
                      
             if (elapsed > 9) {
             $(".seconds").html(elapsed);
             } else {
                 $(".seconds").html("0" + elapsed);
             }
             if(elapsed == 0)
             {
                 breakTVal--;
                 if (breakTVal > 9){
                 $(".minutes").html(breakTVal);
                 } else{
                     $(".minutes").html("0" + breakTVal);
                 }
                 elapsed = 59;
                 
             } else if(breakTVal == 0 && elapsed == 1){
                        
                 
                        clearInterval(b);
                 
                       
                        audio.play();
                 
                        reset();
                          
                        startTimer();
                 
               } else {
                   
                   elapsed--;
                   
               }
      
                         
             
         },1000);
        
        
        
    }
  
});
    