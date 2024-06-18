$(document).ready(function() {
    function fetchProgramme() {
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                var programme = $(response).find('.programme .content').html();
                $('#programmeTV').html(programme);
            },
            error: function() {
                $('#programmeTV').html('<p>Erreur lors du chargement du programme TV.</p>');
            }
        });
    }

    // Actualisation toutes les 10 minutes (600 000 ms)
    setInterval(fetchProgramme, 600000); 
    fetchProgramme(); // Appel initial
});
