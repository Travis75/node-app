$(document).ready(function(){
  $('li').on('click', function(e){
    $(".modal-body").empty()
    $('.modal-body').append($("#" + $(e.currentTarget).text()).clone()[0])
    $($('.modal-body').children()[0]).removeClass('hidden')

    $($('#Register')[0]).on('submit',function(){
       if($('#pwd').val()!=$('#confirm').val()){
           alert('Passwords do not match');
           return false;
       }
       return true;
    });
  })
})

