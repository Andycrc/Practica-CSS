const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');



function css(done) {
    src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))  // Manejo de errores en Sass
        .pipe(postcss([autoprefixer()]))          // Autoprefixer para compatibilidad de navegadores
        .pipe(dest('build/css'));                 // Guardar el CSS en la carpeta build

    done();
}


// async function imagenes(done) {
//     const imagemin = (await import('gulp-imagemin')).default;
    
//     src('src/img/**/*')
//         .pipe(imagemin({ optimizationLevel: 3 }))
//         .pipe(dest('build/img'));
    
//     done();
// }

// async function versionWebp() {
//     const webp = (await import('gulp-webp')).default;
    
//     return src('src/img/**/*.{png,jpg}')
//         .pipe(webp())
//         .pipe(dest('build/img'));
// }




function dev() {
    watch('src/scss/**/*.scss', css);  // Ejecuta la tarea css al detectar cambios en SCSS
   // watch('src/img/**/*', imagenes);
}



exports.css = css;
exports.dev = dev;
// exports.imagenes = imagenes;
// exports.versionWebp = versionWebp;
// exports.default = series(imagenes, versionWebp, css, dev);
exports.default = series(css, dev);