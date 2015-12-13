//For this logic I used stands4 api and ajax to retrieve and display the information. Utilizing very elementary jQuery to do this
$(document).ready(function() {
  $(".lead").html("Click quote button to generate a random quote. Enjoy and have a nice day.");
  $(".author").html("Jahil Khalfe");
  $("button").click(function() {
    $.ajax({
      type: "GET",
      url: "http://www.stands4.com/services/v2/quotes.php?uid=4560&tokenid=WkXLo8H3dDpZ9L4C&searchtype=RANDOM",
      dataType: "xml",
      success: function(xml) {
        $(xml).find('results').each(function() {
          var quote = $(this).find('quote').text();
          var author = $(this).find('author').text();
          $('.lead').html('\"' + quote + '\"');
          $('.author').html(author);
        });

      }
    });
  });
});