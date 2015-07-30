# Gulp Runner

Simple module for running gulp tasks programattically, since `gulp.run` is deprecated.

## Usage
```
var GulpRunner = require('gulp-runner');

// Runs path.resolve, but probably a good idea 
// to hand this a full filepath
var gulp = new GulpRunner('gulpfile.js');
```

### Simple Callback
```
gulp.run(['task1', 'task2'], {/* gulp cli options (camelcased) */}, function(err) {
  // done!
})

```

### Event Emitter interface

```
// Need to bind your events before calling run()
runner.on('start', function() {
  console.log('gulp starting...')
})

runner.on('complete', function() {
  console.log('complete!')
})

runner.on('log', function(data) {
  console.log(data)
})

runner.on('error', function(err) {
  console.error(err)
})

runner.on('failed', function() {
  console.log('failed. oh no!')
})

runner.run('default')
```