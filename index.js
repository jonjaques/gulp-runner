var child = require('child_process');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var path = require('path')
var extend = require('extend');
var decamelize = require('decamelize');

var DEFAULTS = {
  noColor: true
}

function GulpRunner(gulpfile) {
  this.gulpfile = path.resolve(gulpfile);
}

util.inherits(GulpRunner, EventEmitter)

GulpRunner.prototype.run = function(tasks, options, cb) {
  var self = this;
  if (typeof options === 'function' && !cb) {
    cb = options;
    options = {}
  }

  if (!cb) {
    cb = function(){}
  }

  options = (options || {})
  options.gulpfile = this.gulpfile;
  tasks = util.isArray(tasks) ? tasks : [tasks];

  var gulpBin = require.resolve('gulp/bin/gulp.js')
  var gulp = child.spawn(gulpBin, buildOpts(tasks, options), {
    detached: true,
    cwd: __dirname
  })
  
  self.emit('start');
  
  gulp.stdout.on('data', function(data) {
    self.emit('log', data.toString())
  })

  gulp.stderr.on('data', function(data) {
    self.emit('error', data)
  })

  gulp.on('close', function(code) {
    if (code !== 0) {
      self.emit('failed', code);
      cb(new Error('gulp failed'))
    } else {
      self.emit('complete', code)
      cb(null)
    }
  });

};

function buildOpts(tasks, options) {
  var args = []
  var opts = extend({}, DEFAULTS, options)

  args = args.concat(tasks);

  Object.keys(opts).forEach(function(key) {
    var val = opts[key];
    if (val === true || typeof val === 'undefined') {
      args.push(buildKey(key))
    } else if (typeof val === 'string') {
      args.push(buildKey(key), val)
    } else if (val === false) {
      args.push(buildKey(key), 'false')
    } else if (util.isArray(val)) {
      val.forEach(function(v) {
        args.push(buildKey(key), v);
      })
    } else if (val != null && !util.isArray(val) && Object.keys(val).length) {
      throw new Error("Can't pass complex objects to `options`.")
    }
  })

  return args;
}

function buildKey(key) {
  return '--' + decamelize(key, '-');
}

module.exports = GulpRunner;