$(document).ready(function(){
    $("#connect").on(("click"), function(e){
      if (window.location.href.split("?value=").length > 2 || existOptions.publicToken != undefined) {
        HumanConnect.open(existOptions)
      } else {
        HumanConnect.open(options);
      }
    })
})