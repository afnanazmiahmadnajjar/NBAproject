const render = (teamData) => {
  let source = $("#displayContainer-template").html();
  let template = Handlebars.compile(source);
  $("#displayContainer").empty();
  for (let player of teamData) {
    let newHTML = template(player);
    $("#displayContainer").append(newHTML);
  }
};

const fetchData = () => {
  let teamName = $("#teamNameInput").val().toLowerCase();
  $.get(`/teams/${teamName}`, (teamData) => {
    render(teamData);
    getPlayerData();
  });
  $("#teamNameInput").val("");
};

const displayDataBtn = () => {
  fetchData();
};

function img404(img) {
  img.src = "https://makitweb.com/demo/broken_image/images/noimage.png";
}
