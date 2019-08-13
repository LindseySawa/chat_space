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

})