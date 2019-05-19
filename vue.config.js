// function mock(app, url, data) {
//   app.get(url, (request, response) => {
//     response.json(data)
//   })
// }
// const mockBookHomeData = require('./src/mock/bookHome')
// const mockBookShelfData = require('./src/mock/bookShelf')
// const mockBookList = require('./src/mock/bookCategoryList')
// const mockBookFlatList = require('./src/mock/bookFlatList')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    open: true
    // proxy: {
    //   '/book': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true
    //   }
    // }
    // before(app) {
    //   mock(app, '/book/home', mockBookHomeData)
    //   mock(app, '/book/shelf', mockBookShelfData)
    //   mock(app, '/book/list', mockBookList)
    //   mock(app, '/book/flat-list', mockBookFlatList)
    // }
  }
}
