var Runner = require('../');
var path = require('path');

var gulpfile = path.resolve(__dirname, 'gulpfile.js');
var runner = new Runner(gulpfile);

runner.on('start', function() {
  console.log('gulp starting...')
})

runner.on('complete', function() {
  console.log('complete!')
})

runner.on('log', function(data) {
  // console.log(data)
})

runner.on('error', function(err) {
  console.error(err)
})

runner.on('failed', function() {
  console.log('failed. oh no!')
})


runner.run('default')

runner.run('default', function() {
  console.log('second gulp... done')
})
