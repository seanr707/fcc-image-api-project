$(document).ready(function(){
  $('form').on('submit',function(e) {
    e.preventDefault();
    var url = $('#url').val();
    $('#short-url').text('Loading.......');
    $.post('/filesize')
    .done(function(data){
      $('input').val('');
      var fin = JSON.stringify(data);
    $('#filesize').html('<strong>Error: </strong>Submit a valid file');
    })
    .fail(function(xhr, status, err){
      console.log(err);
      $('#short-url').html('<strong>Error: </strong>Submit a valid file');
    });
  });
});
