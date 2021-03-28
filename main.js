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
  inventory: window.books.store,
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
        e('h1', {className: 'heading'}, 'Books'),
        store.getState().inventory.map(function(category) { return category.books; }).flat().map(function(book) {
          return (
            div({className: 'books', key: book.categories}, [
              div({className: 'category'}, book.category),
              div({className: 'book-name'}, book.name),
              img({className: 'item-img', src: book.image}, null),
              div({className: 'book-author'}, book.author),
              div({className: 'book-rate'}, book.rate),
              div({className: 'book-voters'}), book.voters,
              // button({className: 'add-to-basket', onClick: function() {
              //   store.dispatch({type: 'ADD-TO-THE-BASKET', payload: book})}
              // }, 'Add to the basket'),
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
          div({className: 'basket-item', key: book.name}, [
            div({className: 'category'}, book.category),
            div({className: 'book-author'}, book.author),
            img({className: 'item-img', src: book.image}, null),
            div({className: 'book-name'}, book.name),
            div({className: 'book-rate'}, book.rate),
            div({className: 'book-voters'}), book.rate,
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