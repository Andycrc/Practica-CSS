const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');


function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))  
        .pipe(postcss([autoprefixer()/*, cssnano()*/]))   
        .pipe(sourcemaps.write('.'))      
        .pipe(dest('build/css'));              

    done();
}


function dev() {
    watch('src/scss/**/*.scss', css);  // Ejecuta la tarea css al detectar cambios en SCSS
   
}



exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);