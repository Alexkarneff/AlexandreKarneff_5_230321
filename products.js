const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get('id');

fetch('http://localhost:3000/api/furniture/' + product_id)
.then(function(res) {
	if (res.ok) {
		return res.json();
	}
})

.then(function (res) {

document.getElementsByClassName('product_name')[0].textContent = res.name;

document.getElementsByClassName('product_price')[0].textContent = res.price +" €";

document.getElementById('containerImgDescription').children[0].children[0].setAttribute('src', res.imageUrl);

document.getElementsByClassName('text_description')[0].textContent = res.description;

res.varnish.forEach(varnishColor => {
    newChoice = addVarnishOption(varnishColor);

    document.getElementById('varnishChoices').appendChild(newChoice);

});
})
.catch (function(error){
    console.log(error);
});

function addVarnishOption(varnishOption) {
    const newOption = document.createElement('option');
    newOption.classList.add('varnishOption')
    newOption.setAttribute('varnishValue',varnishOption);

    newOption.textContent = varnishOption;

    return newOption;
}