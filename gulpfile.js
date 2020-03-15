const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel  = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
    

const env = process.env.NODE_ENV;
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
    return src( `${DIST_PATH}/**/*`, { read: false })
    .pipe(rm());
});

task('copy:pug', () => {
    return src([`${SRC_PATH}/*.pug`])
    .pipe(pug())
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.stream());
});

task('copy:img', () => {
    return src(`${SRC_PATH}/images/**/*.{gif,jpg,jpeg,png}`)
    .pipe(dest(`${DIST_PATH}/images`));
});

task('copy:svg', () => {
    return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(cheerio({
        run: function ($) {
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg"

            }
        }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`));
});

task('copy:fonts', () => {
    return src(`${SRC_PATH}/fonts/**/*`).pipe(dest(`${DIST_PATH}/fonts`));
});

task('styles', () => {
    return src([...STYLE_LIBS, `${SRC_PATH}/scss/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
        cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.stream());
});

task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/scripts/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.js', { newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.stream());
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});


task('watch', () => {
    watch(`${SRC_PATH}/scss/**/*.scss`, series('styles'));
    watch(`${SRC_PATH}/**/*.pug`, series('copy:pug'));
    watch(`${SRC_PATH}/scripts/*.js`, series('scripts'));
});

task('default',
    series('clean',
    parallel('copy:pug', 'copy:img', 'copy:svg', 'copy:fonts', 'styles', 'scripts'),
    parallel('watch', 'server')
    )
);

task('build',
    series('clean',
    parallel('copy:pug', 'copy:img', 'copy:fonts', 'styles', 'scripts'))
);