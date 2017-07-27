$(document).ready(() => {
  receiveItems()
})

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
  $('.cart').append(`
    <div class="cart-item">
      <h5>${title}</h5>
      <h4>${price}</h4>
    </div>`)
}

  $('.cards').on('click', '.add-btn', function () {
  const item = $(this).parent().children()
  appendToCart(item)
})
