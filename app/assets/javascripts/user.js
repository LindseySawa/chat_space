$(function () {
  var search_list = $("#user-search-result");

  function searchUsers(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`;
    return html;
  }

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    search_list.append(html);
  }




  $("#user-search-field").on('keyup', function (e) {
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json',

    })
      .done(function (users) {
        $('#user-search-result').empty();
        if (input.length !== 0) {
          users.forEach(function (user) {
            searchUsers(user);
            var html = searchUsers(user);
            $('#user-search-result').append(html)
          });
        }

        else {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
      })
      .fail(function () {
        alert("メンバーの検索に失敗しました");
      });

  });


  $(function () {
    function appendUsers(user_id, user_name) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value=${user_id}>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`;
      return html;
    }

    $('#user-search-result').on('click', ".chat-group-user__btn--add", function () {
      var user_id = $(this).attr("data-user-id");
      var user_name = $(this).attr("data-user-name");
      var html = appendUsers(user_id, user_name);
      $(this).parent().remove();
      $('.chat-group-user__name').append(html);

    })
  })
  $(function () {
    $('.chat-group-user').on('click', ".user-search-remove", function () {
      $(this).parent().remove();
    })
  })

})