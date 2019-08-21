$(document).on('turbolinks:load', function () {
  $(function () {
    function buildHTML(message) {
      var imagehtml = message.image ? `<img class='right__chat2__img' src='${message.image}'></img>` : "";
      var common_html = `<div class='right__middle2' data-message-id="${message.id}">
                          <div class='right__chat1'>
                            <div class='right__chat1__user'>
                              ${message.user_name}
                              </div>
                            <div class='right__chat1__time'>
                              ${message.created_at}
                              </div>
                            </div>
                          </div>
                          <div class='right__chat2'>
                            <div class='right__chat2__msg'>
                            ${message.content}
                            </div>
                            ${imagehtml}
                          </div>
                        </div>`
      return common_html;
    };


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

          $('.right__middle').animate({ scrollTop: $('.right__middle')[0].scrollHeight }, 'fast');
          $('.left__bottom').animate({ scrollTop: $('.left__bottom')[0].scrollHeight }, 'fast');
          $("#new_message")[0].reset();
          $('.right__btn2').prop('disabled', false);
        })

        .fail(function () {
          alert('error');
        });
    });

    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        last_message_id = $('.right__middle2:last').data('message-id')

        $.ajax({
          url: 'api/messages',
          type: 'GET',
          dataType: 'json',
          data: { id: last_message_id }
        })
          .done(function (messages) {
            var insertHTML = '';
            messages.forEach(function (message) {
              insertHTML = buildHTML(message);
              $('.right__middle').append(insertHTML);
              $('.right__middle').animate({ scrollTop: $('.right__middle')[0].scrollHeight }, 'fast');
            })
          })

          .fail(function () {
            alert('error')
          });
      };
    };
    setInterval(reloadMessages, 5000);
  });
})