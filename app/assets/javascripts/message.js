$(function () {
  function buildHTML(comment) {
    var imagehtml = message.image.present ? <img class='right__chat2__img' src='${message.image.url}'></img> : ""
    var html = `<div class='right__chat1'>
                  <div class='right__chat1__user'>
                    ${message.user.name}</div>
                  <div class='right__chat1__time'>
                    ${message.created_at.strftime("%Y/%m/%d %H:%M")}</div>
                  <div class='right__chat2'>
                    ${message.content}</div>
                    <div class='right__chat2__msg>
                    imagehtml</div>
                 </div>`
    return html;
  }


  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.right__middle').append(html)
      $('#message_content').val('')
      $('.right__middle2').animate({ scrollTop: $('.right__middle2')[0].scrollHeight }, 'fast');
    })
    .fail(function () {
      alert('error');
    })
  })
});