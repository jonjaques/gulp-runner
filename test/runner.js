var Runner = require('../');
var path = require('path');

var gulpfile = path.resolve(__dirname, 'gulpfile.js');
var runner = new Runner(gulpfile);
var runner1 = new Runner(gulpfile);
var runner2 = new Runner(gulpfile);

runner.on('start', function() {
  console.log('gulp starting...')
})

runner.on('complete', function() {
  console.log('first gulp... complete!')
})

runner.on('log', function(data) {
  process.stdout.write(data)
})

runner.on('error', function(err) {
  process.stdout.write(err)
})

runner.run('default')

runner1.run('doomed', function(err) {
  console.log(err)
  console.log('second gulp... failed')
})

runner2.run(['default', 'task2'], function() {
  console.log('third gulp... done')
})
