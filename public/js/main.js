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

    $('.edit-story').click(function() {
        $('#edit-form-title').val($(this).data('title'));
        $('#edit-form-id').val($(this).data('id'));
        $('#edit-form-state').val($(this).data('state'));
        $('#edit-form-story').val($(this).data('story'));

    })

      $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".well").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    

    //     fetch("https://qvoca-bestquotes-v1.p.rapidapi.com/quote", {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "qvoca-bestquotes-v1.p.rapidapi.com",
    //         "x-rapidapi-key": "9021c736e0msh8ee4868bd0fc998p1b37c9jsn2729e92e5606"
    //     }
    // })
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    
});

