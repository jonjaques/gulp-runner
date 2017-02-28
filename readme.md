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
gulp.run('task', function(err) {
  // complete if no error
})
```

### CLI Options

```
/* optional cli arguments (camelcased) */
var opts = {
  require: ['coffeescript', 'some-lib'],
  tasksSimple: true,
  production: true   // also accepts arbitrary flags 
                     // for use within your tasks
};

// equivalent of calling 
// gulp task1 task2 --require 'coffeescript' --require 'some-lib' --tasks-simple --production
gulp.run(['task1', 'task2'], opts, function(err) {
  // complete!
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

gulp.on('log', function(data: Buffer) {
  // console.log(data.toString())
  // works better to 
  process.stdout.write(data);
})

gulp.on('error', function(err: Buffer) {
  process.stderr.write(err);
})

gulp.run('default')
```