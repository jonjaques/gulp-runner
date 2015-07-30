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
var opts = {/* gulp cli options (camelcased) */};
gulp.run(['task1', 'task2'], opts, function(err) {
  // done!
})

```

### Event Emitter interface

Note: You can call `run()` many times with the same instance,
but there will be no distinction between events. 
Best to use a new instance, or just pass an array of tasks.

```
// Need to bind your events before calling run()
gulp.on('start', function() {
  console.log('gulp starting...')
})

gulp.on('complete', function() {
  console.log('complete!')
})

gulp.on('log', function(data) {
  console.log(data)
})

gulp.on('error', function(err) {
  console.error(err)
})

gulp.on('failed', function() {
  console.log('failed. oh no!')
})

gulp.run('default')
```