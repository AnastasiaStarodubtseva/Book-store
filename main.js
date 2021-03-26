function reducer(model, action) {
  switch (action.type) {
    case 'ADD-TO-THE-BASKET':
      model.basket.push(action.payload);
      return model;
    case 'REMOVE-FROM-THE-BASKET':
      model.basket.splice(model.basket.indexOf(action.payload), 1);
      return model;
    default:
      return model;
  }
}

var store = Redux.createStore(reducer, {
  products: [
    {type: 'tomato', weight: '0,5kg', price: currency(0.5), image: './products/tomato.jpeg'},
    {type: 'carrot', weight: '1kg', price: currency(0.1), image: './products/carrot.jpeg'},
    {type: 'orange', weight: '0.2kg', price: currency(0.2), image: './products/orange.jpeg'},
    {type: 'apple', weight: '0.3kg', price: currency(0.3), image: './products/apple.jpeg'}
  ],
  basket: [

  ]
});

const e = React.createElement;

function div(attrs, children) { return e('div', attrs, children); }
function button(attrs, children) { return e('button', attrs, children); }
function img(attrs, children) { return e('img', attrs, children); }

function render() {
  ReactDOM.render(
    e(ReactRedux.Provider, { store: store }, [
      // products
      div({className: 'list-of-items'}, [
      // heading
        e('h1', {className: 'heading'}, 'Products'),
        store.getState().products.map(function(product) {
          return (
            div({className: 'products'}, [
              img({className: 'item-img' ,src: product.image}, null),
              div({className: 'product-type'}, product.type),
              div({className: 'product-weight'}, product.weight),
              div({className: 'product-price'}, product.price.value),
              button({className: 'add-to-basket', onClick: function() {
                store.dispatch({type: 'ADD-TO-THE-BASKET', payload: product})}
              }, 'Add to the basket'),
            ])
          )
        })
      ]),

    // basket
    e('div', { className: 'basket' }, [
      e('h1', {className: 'basket-heading'}, 'Basket'),
      store.getState().basket.length === 0
      ? e('p', {}, 'Basket is empty')
      : store.getState().basket.map(function(basketItem) {
        return (
          div({className: 'basket-item'}, [
            img({className: 'item-img' ,src: basketItem.image}, null),
            div({className: 'item-type'}, basketItem.type),
            div({className: 'item-weight'}, basketItem.weight),
            div({className: 'item-price'}, basketItem.price.value),
            button({className: 'remove-item', onClick: function() {
              store.dispatch({type: 'REMOVE-FROM-THE-BASKET', payload: basketItem})
            }}, 'Remove')
          ])
        )
      }),
      e('div', {className: 'total-price'}, 'Total ' + store.getState().basket.reduce(function(accumulator, currentValue){
        return accumulator.add(currentValue.price)}, currency(0))
      )
    ])
    ]),
    document.getElementById('root')
  );
}
store.subscribe(function() { render(); });
render();