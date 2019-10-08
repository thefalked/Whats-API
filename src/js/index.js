$(document).ready(function() {
  new ClipboardJS('#copy');

  $("#numero").mask("0.0000-0000", {reverse: true})

  $("#generate").click(function () {
    if ($("#generate").css("cursor") == "not-allowed") {
      return
    } else {
      let pais = $("#pais").val().split("+")[1];
      let ddd = $("#ddd").val();
      let numero = $("#numero").val().split(".").join("").split("-").join("");
      let texto = $("#texto").val().split(" ").join("%20");
      let fullnumber = pais+ddd+numero;
      let link;
      if (texto.length > 0)
        link = `https://wa.me/${fullnumber}?text=${texto}`;
      else
        link = `https://wa.me/${fullnumber}`;
  
      if ($("#pais").val() && $("#ddd").val() && $("#numero").val()) {
        $("#textoModal").text(link);
      }

      $("#modal").modal("show");
    }
  });

  $("#pais, #ddd, #numero").on("change paste keyup", function () {
    if ($("#pais").val() && $("#ddd").val() && $("#numero").val() &&
    $("#numero").val().split(".").join("").split("-").join("").length >= 8) {
      $("#generate").css("cursor", "pointer");
    } else {
      $("#generate").css("cursor", "not-allowed");
    }
  });
});