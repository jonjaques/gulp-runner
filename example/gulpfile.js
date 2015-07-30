var gulp = require('gulp');

gulp.task('default', function(done) {
  console.log('running some task...')
  setTimeout(function() {
    console.log('some task complete...')
    done();
  }, 1000)
})