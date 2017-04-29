var gulp = require('gulp');

gulp.task('default', function(done) {
  setTimeout(function() {
    done();
  }, 10);
});

gulp.task('fails', function(done) {
  console.error('this is an error');
  throw new Error('failcake');
});