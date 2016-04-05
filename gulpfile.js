var gulp = require('gulp');  
var less = require('gulp-less');
var watch      = require('gulp-watch');
var minifyCSS  = require('gulp-minify-css');  
var rename     = require('gulp-rename');  
var header     = require('gulp-header');  
var pkg        = require('./package.json');


/* Prepare banner text */
var banner = ['/**',  
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.author.name %> <<%= pkg.author.email %>>',
  ' */',
  ''].join('\n');


//Task to Compile Less

gulp.task('compile-less', function() {  
  gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('css/'));
});


/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('less/**/*.less' , ['compile-less']);
});


/* Task to minify css */
gulp.task('minify-css', function() {  
  gulp.src('css/portal.css')
    .pipe(minifyCSS())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename('portal.min.css'))
    .pipe(gulp.dest( 'css/' ));
		
		gulp.src('css/app.css')
    .pipe(minifyCSS())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest( 'css/' ));
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['compile-less', 'watch-less']);

/* Task when running `gulp build` from terminal */
gulp.task('build', ['minify-css']);