      $('#but_block1').click(function(event){
        $('#non_select1').css('display', 'none');
        $('#select1').css('display', 'inline-block');
        $('.label_edit1').css('display', 'none');

    })

      $('#but_block2').click(function(event){
        $('#non_select2').css('display', 'none');
        $('#select2').css('display', 'inline-block');
        $('.label_edit2').css('display', 'none');

    })

    $('#but_block3').click(function(event){
        $('#non_select3').css('display', 'none');
        $('#select3').css('display', 'inline-block');
        $('.label_edit3').css('display', 'none');

    })
  
  $('#edit_button').click(function (event) {
    $('.predit').css('display', 'none');
    $('.edit').css('display', 'inline-block');
    $('.aft_fade').parent('.edit').attr('contentEditable', 'true');
    $('.aft_fade').css('display', 'none'); 
    $('#return_icon').css('display', 'inline-block');
})

  $('#edit_button1').click(function (event) {
    $('.predit1').css('display', 'none');
    $('.edit1').css('display', 'inline-block');
    $('.aft_fade1').parent('.edit1').attr('contentEditable', 'true');
    $('.aft_fade1').css('display', 'none');
    $('#return_icon1').css('display', 'inline-block');
})

  $('#edit_button2').click(function (event) {
    $('.predit2').css('display', 'none');
    $('.edit2').css('display', 'inline-block');
    $('.aft_fade2').parent('.edit2').attr('contentEditable', 'true');
    $('.aft_fade2').css('display', 'none');
    $('#return_icon2').css('display', 'inline-block');
})

  $('#edit_button3').click(function (event) {
    $('.predit3').css('display', 'none');
    $('.edit3').css('display', 'inline-block');
    $('.aft_fade3').parent('.edit3').attr('contentEditable', 'true');
    // $('.aft_fade3').css('display', 'none');
    $('#return_icon3').css('display', 'inline-block');
})

  $('#edit_button4').click(function (event) {
    $('.predit4').css('display', 'none');
    $('.edit4').css('display', 'inline-block');
    $('.aft_fade4').parent('.edit4').attr('contentEditable', 'true');
    // $('.aft_fade4').css('display', 'none');
    $('#return_icon4').css('display', 'inline-block');
})

  $('#edit_button5').click(function (event) {
    $('.predit5').css('display', 'none');
    $('.edit5').css('display', 'inline-block');
    $('.aft_fade5').parent('.edit5').attr('contentEditable', 'true');
    // $('.aft_fade5').css('display', 'none');
    $('#return_icon5').css('display', 'inline-block');
})


// skjgflyuasgvfsdhjhhhhhhhhhhhhhhhhhhhhhhhhhhh


  $('#return_icon').click(function (event) {
    $('.edit').css('display', 'none');
    $('.predit').css('display', 'inline-block');
    $('.aft_fade').css('display', 'inline-block');
    $('#return_icon').css('display', 'none');

})

    $('#return_icon1').click(function (event) {
    $('.edit1').css('display', 'none');
    $('.predit1').css('display', 'inline-block');
    $('.aft_fade1').css('display', 'inline-block');
    $('#return_icon1').css('display', 'none');

})

      $('#return_icon2').click(function (event) {
    $('.edit2').css('display', 'none');
    $('.predit2').css('display', 'inline-block');
    $('.aft_fade2').css('display', 'inline-block');
    $('#return_icon2').css('display', 'none');

})

        $('#return_icon3').click(function (event) {
    $('.edit3').css('display', 'none');
    $('.predit3').css('display', 'inline-block');
    $('.aft_fade3').css('display', 'inline-block');
    $('#return_icon3').css('display', 'none');

})

          $('#return_icon4').click(function (event) {
    $('.edit4').css('display', 'none');
    $('.predit4').css('display', 'inline-block');
    $('.aft_fade4').css('display', 'inline-block');
    $('#return_icon4').css('display', 'none');

})

            $('#return_icon5').click(function (event) {
    $('.edit5').css('display', 'none');
    $('.predit5').css('display', 'inline-block');
    $('.aft_fade5').css('display', 'inline-block');
    $('#return_icon5').css('display', 'none');

})

document.addEventListener('keydown', function (event) {
  var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
      data = {};

  if (input) {
    if (esc) {
      document.execCommand('undo');
      el.blur();
    } else if (nl) {
      data = el.innerHTML;
      
      el.blur();
      event.preventDefault();
    }
  }
}, true);