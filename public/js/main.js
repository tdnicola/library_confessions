$(document).ready(() => {
    $('.delete-story').click(function() {
        var id = $(this).data('id');
        var url = '/delete/'+ id;
        if(confirm('Delete Story? No going back...')){
            $.ajax({
                url: url,
                type: "delete",
                success: function(res) {
                    console.log('deleted story')
                    window.location.href='/'
                },
                error: function(err) {
                    console.log(err)
                }
            });
        }
    });

//EDIT FUNCTION
    $('.edit-story').click(function() {
        $('#edit-form-title').val($(this).data('title'));
        $('#edit-form-id').val($(this).data('id'));
        $('#edit-form-state').val($(this).data('state'));
        $('#edit-form-story').val($(this).data('story'));
    })

//SEARCH FUNCTION
      $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".card").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    
//BUTTON API FOR QUOTE
    $('#pullDown').click(function(e) {
        e.preventDefault();    
        $.ajax({
            url: 'https://api.quotable.io/random',
            success: function(res) {
                console.log(res);
                $('.quote').html('"' + res.content + '"' + '<br>' + "Author: " + res.author);

            },
            error: function(err) {
                console.log(err);
            }
        });
    })



    //like button
    $('button[data-id]').click(function(e) {

        if ($(this).children().hasClass("true") == false ){
            var likes = $(this).data('likes') + 1;
            $(this).children().attr('class','fa fa-heart true');
            $(this).children().text(likes);
            var id = $(this).data('id');
            var url = '/' + likes + '/' + id;

                $.ajax({
                    url: url,
                    type: "post",
                    success: function(res) {
                        console.log('updated likes')
                    },
                    error: function(err) {
                        console.log(err)
                    }
                });
        
        }
    })

});
