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
        $(".well").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    
//BUTTON API FOR QUOTE
    $('#pullDown').click(function(e) {
        e.preventDefault();    
        $.ajax({
            url: 'https://api.quotable.io/random',
            success: function(res) {
                $('.quote').html(res.content + '<br>' + "Author: " + res.author);

                console.log(res);
            },
            error: function(err) {
                console.log(err);
            }
        });
    })
});

