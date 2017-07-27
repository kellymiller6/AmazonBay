$(document).ready(() => {
  receiveItems()
  receiveOrders()
  for (let i = 0; i < localStorage.length; i++){
    const $storedItems = getStoredItems(localStorage.key(i));
    appendStoredItems($storedItems)
  }
})

const getStoredItems = (id) => {
  return JSON.parse(localStorage.getItem(id));
}

const appendStoredItems = (obj) => {
  const title = obj.title;
  const price = obj.price;
  cartAppend(title,price)
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

const receiveOrders = () => {
  fetch('/api/v1/orders')
  .then(response => response.json())
  .then(orders => {
    if(orders.length){
      appendOrders(orders);
    }else{
      $('.past-orders').append(`
        <p>No past orders to display.</p>
      `);
    }
  });
};

const appendOrders = (orders) => {
  orders.map(order => {
    let displayPrice = order.total_price/100;
    $('.past-orders').append(`
      <div class='order'>
        <h5>Date: ${order.created_at}</h5>
        <h6>Total: ${displayPrice}</h6>
      </div>
    `)
  })
}

const appendItems = (items) => {
  items.map(item => {
    let displayPrice = item.price/100;
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
  const title = item[0].innerHTML
  const price = item[3].innerHTML
  const $item = {title: title, price: price}
  const key = title
  localStorage.setItem(title, JSON.stringify($item))
  cartAppend(title, price)
}

const cartAppend = (title, price) => {
  $('.cart-items').append(`
    <div class="cart-item">
      <h5>${title}</h5>
      <h4 class='price'>${price}</h4>
    </div>`)
}

$('.cards').on('click', '.add-btn', function () {
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
  $('.cart-total').append(`

      <p>Total: $${totalPrice}.00</p>
    `)
}

const createOrder = (total) => {
  $.ajax({
    url: '/api/v1/orders',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({total_price: total}),
    dataType: 'json',
    success: (response) => {
      receiveOrders(response);
    }
  })
}

$('.pur-btn').on('click', function () {
  let order = $(this).parents()[0].children[3].innerHTML;
  let orderTotal = parseInt(order.match(/\d+/)[0]) * 100;
  createOrder(orderTotal)
  localStorage.clear()
})
