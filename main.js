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
  basket: []
});

const e = React.createElement;

function div(attrs, children) { return e('div', attrs, children); }
function button(attrs, children) { return e('button', attrs, children); }
function img(attrs, children) { return e('img', attrs, children); }

// function search() {
//   React.createElement('div', { className: 'search-book'}, [
//     React.createElement('div', {className: 'icon', src: './images/loupe.png'}, {}),
//     React.createElement('input', {placeholder: 'Search Book'}, {})
//   ]);
// }

function render() {
  ReactDOM.render(
    e(ReactRedux.Provider, { store: store }, [
      // products
      div({className: 'list-of-items'}, [
      // heading
        e('h1', {className: 'heading'}, 'Books'),
        store.getState().inventory.map(function(category) {
          return category.books.map(function(book) {
            book.category = category.category;
            book.price = currency(12);
            return book;
          });
        }).flat().map(function(book) {
          return (
            div({className: 'books', key: book.categories}, [
              div({className: 'category'}, book.category),
              div({className: 'book-name'}, book.name),
              img({className: 'item-img', src: './images/' + book.image}, null),
              div({className: 'book-author'}, book.author),
              div({className: 'book-rate'}, book.rate),
              div({className: 'book-voters'}, book.voters),
              div({className: 'book-price'}, book.price.value + '€'),
              button({className: 'add-to-basket', onClick: function() {
                store.dispatch({type: 'ADD-TO-THE-BASKET', payload: book})}
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
      : store.getState().basket.reduce(function(accumulator, currentValue) {
          if (accumulator.find(function(bookWithQuantity) { return bookWithQuantity.book === currentValue })) {
            var index = accumulator.findIndex(function(bookWithQuantity) {return bookWithQuantity.book === currentValue});
            accumulator[index].quantity += 1
            return accumulator;
          } else  {
            return accumulator.concat({book: currentValue, quantity: 1 });
          }
        }, []).map(function(basketItem) {
        return (
          div({className: 'basket-item', key: basketItem.name}, [
            div({className: 'category'}, basketItem.book.category),
            div({className: 'book-author'}, basketItem.book.author),
            img({className: 'item-img', src: './images/' + basketItem.book.image}, null),
            div({className: 'book-name'}, basketItem.name),
            div({className: 'book-rate'}, basketItem.book.rate),
            div({className: 'book-voters'}, basketItem.book.voters),
            div({className: 'book-price'}, basketItem.book.price.value + '€'),
            div({className: 'quantity'}, basketItem.quantity),
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