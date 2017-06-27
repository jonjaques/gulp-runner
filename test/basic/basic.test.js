const path = require('path');
const GulpRunner = require('../../index');
const gulpfile = path.resolve(__dirname, 'gulpfile.js');


function enableLogging(gulp) {
    gulp.on('log', (log) => {
        console.log(log.toString());
    });
    gulp.on('error', (log) => {
        console.error(log.toString());
    });
}


test('receive start event', (done) => {
    const gulp = new GulpRunner(gulpfile);
    gulp.on('start', () => {
        done();
    })
    gulp.run('default');
});

test('receive complete event', (done) => {
    const gulp = new GulpRunner(gulpfile);
    gulp.on('complete', () => {
        done();
    })
    gulp.run('default');
});

test('receive log event', (done) => {
    const gulp = new GulpRunner(gulpfile);

    gulp.on('log', (log) => {
        if (log.toString().indexOf("Starting 'default'...") !== -1) {
            done();
        }
    })
    gulp.run('default');
});

test('receive error event', (done) => {
    const gulp = new GulpRunner(gulpfile);

    gulp.on('error', (log) => {
        if (log.toString().indexOf('this is an error') !== -1) {
            done();
        }
    });

    gulp.run('fails');
});

test('receive failure callback', (done) => {
    const gulp = new GulpRunner(gulpfile);

    gulp.on('error', function() {});
    
    gulp.run('fails', function(err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('gulp failed');
        done();
    });
})