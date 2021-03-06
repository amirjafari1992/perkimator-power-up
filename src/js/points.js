import axios from "axios";

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var inputField = document.getElementById("pointInput");
var button = document.getElementById("savePoint");

t.render(function () {
  return Promise.all([t.get("card", "shared", "perkiPoint")]).spread(function (
    perkiPoint
  ) {
    if (perkiPoint != null) {
      inputField.value = perkiPoint;
    } else {
      inputField.value = "0";
    }
  });
});

button.addEventListener("click", function () {
  if (inputField.value != null) {
    var data = "";

    t.set("card", "shared", "perkiPoint", inputField.value);
    t.card("all").then(function (card) {
      data = {
        cardId: card.id,
        storyPoints: inputField.value,
      };
      axios
        .post(`https://beta.perkimator.com/callback/powerup`, data)
        .then(function (response) {
          t.closePopup();
        })
        .catch(function (error) {
          t.closePopup();
        });
    });
  }
});
