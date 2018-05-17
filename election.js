document.addEventListener("DOMContentLoaded", function() {

  // Imagination!

  var list = document.createElement('ul');
  var body = document.querySelector('body')

  $.ajax({
    url: "https://bb-election-api.herokuapp.com/",
    method: 'GET',
    dataType: 'json'
  }).done(function(data) {

    for (var i = 0; i < data.candidates.length; i++) {

      var list_item = document.createElement('li');
      var node = document.createTextNode("Name: " + data.candidates[i].name + " " + "Votes: "+ data.candidates[i].votes);
      list_item.appendChild(node);
      list.append(list_item);
      var form = document.createElement('form');
      form.method = "POST";
      form.action = "https://bb-election-api.herokuapp.com/vote";
      var submit = document.createElement('input');
      var hiddenField = document.createElement('input');
      hiddenField.name = 'name'
      hiddenField.value = data.candidates[i].name
      hiddenField.type = 'hidden'
      submit.type = 'submit'
      submit.value = 'Vote'
      form.appendChild(hiddenField)
      form.appendChild(submit);
      list_item.appendChild(form);
    }

    body.append(list)

    var ul = document.querySelector('ul')
    ul.addEventListener('click', function(e) {

      e.preventDefault();
      var name = e.target.parentNode.querySelector('input').value
      console.log(name);
      $.ajax({
        url: "https://bb-election-api.herokuapp.com/vote",
        method: 'POST',
        body: {"name": name},
      }).done(function(data) {
        console.log(data);
      })

    })

  })
});
