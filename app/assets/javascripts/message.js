$(function () {
  function buildHTML(message) {
    var imagehtml = message.image ? `<img class='right__chat2__img' src='${message.image}'></img>` : "";
    var common_html = `<div class='right__middle2', data-message=${message.id}>
                        <div class='right__chat1'>
                          <div class='right__chat1__user'>
                            ${message.name}
                            </div>
                          <div class='right__chat1__time'>
                            ${message.created_at}
                            </div>
                          </div>
                        </div>`
    if (message.content && message.image.url) {
      var html = `${common_html}
                    <div class='right__chat2'>
                      <div class='right__chat2__msg'>
                      ${message.content}
                      </div>
                      ${imagehtml}
                    </div>`
    } else if (message.content) {
      var html = `${common_html}
                    <div class='right__chat2'>
                      <div class='right__chat2__msg'>
                      ${message.content}
                      </div>
                    </div>`
    } else if (message.image.url) {
      var html = `${common_html}
                    <div class='right__chat2'>
                      ${imagehtml}
                    </div>`
    };
    return html;
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
        $('#new_message')[0].reset();
        $('.right__btn2').prop('disabled', false);



      })
      .fail(function () {
        alert('error');
      });
  });

  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('right__middle2:last').data("message-id")

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: { id: last_message_id }
    })
      .done(function (messages) {
        var insertHTML = buildHTML(message);
        messages.forEach()
      })
      .fail(function () {
        console.log('error');
      });
  };
});