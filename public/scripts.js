$(document).ready(() => {
  receiveItems()
  for (let i = 0; i < localStorage.length; i++){
    const $storedItems = getStoredItems(localStorage.key(i));
    appendStoredItems($storedItems)
  }
})

const getStoredItems = (id) => {
  return JSON.parse(localStorage.getItem(id));
}

const appendStoredItems = (obj) => {
  console.log(obj);
  $('.cart-items').append(`
    <div class="cart-item">
      <h5>${obj.title}</h5>
      <h4 class='price'>${obj.price}</h4>
    </div>`)
  computeTotal()
}

const receiveItems = () => {
  fetch('/api/v1/store')
  .then(response => response.json())
  .then(items => {
    if(items.length){
      appendItems(items);
    }else{
      $('.cards').append(`
        <p>No animals up for adoption at this time, please try again soon!</p>
        `);
      }
    });
  };

  const appendItems = (items) => {
    items.map(item => {
      let displayPrice = item.price/100
      $('.cards').append(`
        <div class='card' data=${item.id}>
          <h4>${item.title}</h4>
          <h5>${item.description}</h5>
          <img class='item-img' src='${item.src}' alt='${item.alt_tag}'>
          <h5>Price: $${displayPrice}.00</h5>
          <button class='add-btn'>Add to Cart</button>
        </div>
        `)
    })
  }


const appendToCart = (item) => {
  console.log(item);
  const title = item[0].innerHTML
  const price = item[3].innerHTML
  const $item = {title: title, price: price}
  const key = title
  localStorage.setItem(title, JSON.stringify($item))
  $('.cart-items').append(`
    <div class="cart-item">
      <h5>${title}</h5>
      <h4 class='price'>${price}</h4>
    </div>`)
}

$('.cards').on('click', '.add-btn', function () {
  console.log($(this).parent());
  const item = $(this).parent().children()
  $(this).prop('disabled', true);
  appendToCart(item)
  computeTotal()
})

const computeTotal = () => {
  $('.cart-total').empty()
  let totalPrice = 0;
  $(".cart").find(".price").each(function() {
    let itemPrice = this.innerHTML.match(/\d+/)[0]
    totalPrice += parseInt(itemPrice);
  });
  $('.cart-total').append(`<div><h2>Total: $${totalPrice}.00</h2></div>`)
}
