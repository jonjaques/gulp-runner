var gulp = require('gulp');

gulp.task('default', function(done) {
  console.log('running some task...')
  setTimeout(function() {
    console.log('some task complete...')
    done();
  }, 1000)
})

gulp.task('task1', function(done) {
  console.log('running task 1');
  setTimeout(function() {
    console.log('task1 complete...')
    done();
  }, 1000)
})

gulp.task('task2', ['task1'], function(done) {
  console.log('running task 2');
  setTimeout(function() {
    console.log('task2 complete...')
    done();
  }, 1000)
})

gulp.task('doomed', function() {
  throw new Error('OMG FAIL')
})