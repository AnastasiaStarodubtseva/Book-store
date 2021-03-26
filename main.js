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
    {type: 'tomato', weight: '0,5kg', price: '0,5€'},
    {type: 'carrot', weight: '1kg', price: '1€'},
    {type: 'orange', weight: '0.2kg', price: '0.2€'},
    {type: 'apple', weight: '0.3kg', price: '0.3€'}
  ],
  basket: [

  ]
});

function render() {
  ReactDOM.render(
    React.createElement(ReactRedux.Provider, { store: store }, [
      // products
      React.createElement('div', {className: 'list-of-items'}, [
      // heading
        React.createElement('h1', {className: 'heading'}, 'Products'),
        store.getState().products.map(function(product) {
          return (
            React.createElement('div', {className: 'products'}, [
              React.createElement('div', {className: 'product-type'}, product.type),
              React.createElement('div', {className: 'product-weight'}, product.weight),
              React.createElement('div', {className: 'product-price'}, product.price),
              React.createElement('button', {className: 'add-to-basket', onClick: function() {
                store.dispatch({type: 'ADD-TO-THE-BASKET', payload: product})}
              }, 'Add to the basket'),
            ])
          )
        })
      ]),

    // basket
    React.createElement('div', { className: 'basket' }, [
      React.createElement('h1', {className: 'basket-heading'}, 'Basket'),
      store.getState().basket.length === 0
      ? React.createElement('p', {}, 'Basket is empty')
      : store.getState().basket.map(function(basketItem) {
        return (
          React.createElement('div', {className: 'basket-items'}, [
            React.createElement('div', {className: 'item-type'}, basketItem.type),
            React.createElement('div', {className: 'item-weight'}, basketItem.weight),
            React.createElement('div', {className: 'item-price'}, basketItem.price),
            React.createElement('button', {className: 'remove-item', onClick: function() {
              store.dispatch({type: 'REMOVE-FROM-THE-BASKET', payload: basketItem})
            }}, 'Remove')
          ])
        )
      }),
      React.createElement('div', {className: 'total'}, 'Total')
    ])
    ]),
    document.getElementById('root')
  );
}
store.subscribe(function() { render(); });
render();