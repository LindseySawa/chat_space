$(function () {
  function buildHTML(message) {
    var imagehtml = message.image ? `<img class='right__chat2__img' src='${message.image}'></img>` : "";
    var html = `<div class='right__middle2'>
                  <div class='right__chat1'>
                    <div class='right__chat1__user'>
                      ${message.name}
                      </div>
                    <div class='right__chat1__time'>
                      ${message.created_at}
                      </div>
                    </div>

                    <div class='right__chat2'>
                      <div class='right__chat2__msg'>
                      ${message.content}
                      </div>
                      ${imagehtml}
                    </div>
                </div>`;
    return html;
  }


  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
        $('.right__middle').append(html);
        $('.right__text__input').reset();
        $('.right__middle').animate({ scrollTop: $('.right__middle')[0].scrollHeight }, 'fast');
        $('.right__btn2').prop('disabled', false);

      })
      .fail(function () {
        alert('error');
      });
  });
});