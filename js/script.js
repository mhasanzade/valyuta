var group1 = document.getElementById("button-group-1");
var btns1 = group1.getElementsByClassName("btn");
var group2 = document.getElementById("button-group-2");
var btns2 = group2.getElementsByClassName("btns");
var current2 = group2.getElementsByClassName("active");
var current1 = group1.getElementsByClassName("active");
var input1 = document.getElementById("first");
var input2 = document.getElementById('second');
var info1 = document.getElementById('info1')
var info2 = document.getElementById('info2')

fetch(`https://api.exchangerate.host/latest?base=RUB&symbols=USD`)
  .then(resp => resp.json())
  .then(data => {
    info1.innerHTML = (`1 RUB = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} USD`)
    input1.value = input1.value.replace(/\s/g, '')
    input2.value = input2.value.replace(/\s/g, '')
    var transform22 = data.rates[Object.keys(data.rates)[0]] * input1.value;
    var transform2 = transform22 % 1 !== 0 ? Number(transform22.toFixed(2)) : transform22;
    input1.value = input1.value.toString().replace(/ /g, "");
    input1.value = input1.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    transform2 = transform2.toString().replace(/ /g, "");
    transform2 = transform2.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    input2.value = transform2
  })


fetch(`https://api.exchangerate.host/latest?base=USD&symbols=RUB`)
  .then(resp => resp.json())
  .then(data => {
    info2.innerHTML = (`1 USD = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} RUB`)
  })

function checkKey() {
  var clean = this.value.replace(/[^0-9.,]/g, "")
    .replace(/(,.*?),(.*,)?/, "$1");
  if (clean !== this.value) this.value = clean;
}

input1.oninput = checkKey;
input2.oninput = checkKey;
input1.addEventListener('keyup', function (e) {
  e.target.value = e.target.value.replace(/ /g, "");
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

input2.addEventListener('keyup', function (e) {
  e.target.value = e.target.value.replace(/ /g, "");
  e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

for (var i = 0; i < btns1.length; i++) {
  btns1[i].addEventListener("click", function () {
    current1[0].className = current1[0].className.replace(" active", "");
    this.className += " active";

    if (current1[0]) {
      var base = current1[0].value;
      var rate = current2[0].value;
      const api_url = fetch(`https://api.exchangerate.host/latest?base=${rate}&symbols=${base}`)
        .then(response => response.json())
        .then(data => {
          console.log(rate)
          input2.value = input2.value.replace(/\s/g, '')
          input1.value = input1.value.replace(/\s/g, '')
          var transform = data.rates[Object.keys(data.rates)[0]] * input2.value;
          var transform1 = transform % 1 !== 0 ? Number(transform.toFixed(2)) : transform;
          transform1 = transform1.toString().replace(/ /g, "");
          transform1 = transform1.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          input2.value = input2.value.toString().replace(/ /g, "");
          input2.value = input2.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          input2.value = input2.value.replace(/,/g, '.')
          input1.value = transform1.toString()
          info2.innerHTML = (`1 ${rate} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${base}`)
          console.log(transform)
        });
      fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${rate}`)
        .then(resp => resp.json())
        .then(data => {
          info1.innerHTML = (`1 ${base} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${rate}`)
        })
      console.log(api_url);
    }
  });

  btns2[i].addEventListener("click", function () {
    current2[0].className = current2[0].className.replace(" active", "");
    this.className += " active";
    if (current2[0]) {
      var base = current1[0].value;
      var rate = current2[0].value;
      const api_url = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${rate}`)
        .then(response => response.json())
        .then(data => {
          console.log(rate)
          input1.value = input1.value.replace(/\s/g, '')
          input2.value = input2.value.replace(/\s/g, '')
          input1.value = input1.value.replace(/,/g, '.')
          var transform22 = data.rates[Object.keys(data.rates)[0]] * input1.value;
          var transform2 = transform22 % 1 !== 0 ? Number(transform22.toFixed(2)) : transform22;
          input1.value = input1.value.toString().replace(/ /g, "");
          input1.value = input1.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          transform2 = transform2.toString().replace(/ /g, "");
          transform2 = transform2.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          input2.value = transform2
          info1.innerHTML = (`1 ${base} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${rate}`)
          console.log(transform22)
        })
      fetch(`https://api.exchangerate.host/latest?base=${rate}&symbols=${base}`)
        .then(resp => resp.json())
        .then(data => {
          info2.innerHTML = (`1 ${rate} = ${data.rates[Object.keys(data.rates)[0]].toFixed(4)} ${base}`)
        })
    }
  });
}

