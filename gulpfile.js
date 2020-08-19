const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();
const handlebars = require('gulp-compile-handlebars');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const del = require('del');


let path = {
	src: {
		html: './src/**/*.hbs',
		css: ['./src/scss/**/*.scss', './src/scss/**/*.css'],
		js: './src/js/**/*.js',
		img: ['./src/**/*.jpg',
			'./src/**/*.png',
			'./src/**/*.svg',
			'./src/**/*.ico'
		],
		vcf: './src/**/*.vcf',
		data: './src/data.json',
	},
	build: {
		html: './build/',
		css: './build/css',
		js: './build/js',
		img: './build',
		vcf: './build',
	}
};

function server(done) {
	browsersync.init({
		server: {
			baseDir: './build/'
		},
		host: 'localhost',
		port: 8800,
		open: false,
	});
	done();
}

function serverReload(done) {
	browsersync.reload();
	done();
}

function html(done) {
	let cards = require('./src/data.json');
	for (let i = 0; i < cards.length; i++) {
		let card = cards[i]
		let folderName = card.url.replace(/ +/g, '-').toLowerCase();

		gulp.src(path.src.html)
		.pipe(handlebars(card))
		.pipe(rename("index.html"))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(path.build.html + folderName + '/'))
		.pipe(browsersync.stream());
		
	}
	done();
}

function css() {
	return gulp
		.src(path.src.css)
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest(path.build.css))
		.pipe(browsersync.stream());
}

function js() {
  return (gulp
	  .src(path.src.js)
	  .pipe(plumber())
	  .pipe(babel({
			presets: ['@babel/env']
		}))
	  .pipe(gulp.dest(path.build.js))
	  .pipe(browsersync.stream())
  );
}

function images() {
  return (gulp
		.src(path.src.img)
		.pipe(
			imagemin([
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng({ optimizationLevel: 7 }),
			])
		)
		.pipe(gulp.dest(path.build.img))
		.pipe(browsersync.stream())
	);
}

function vcf() {
	return gulp
		.src(path.src.vcf)
		.pipe(gulp.dest(path.build.vcf))
		.pipe(browsersync.stream())
}

function watchAll() {
	gulp.watch(path.src.html, html);
	gulp.watch(path.src.css, css);
	gulp.watch(path.src.js, js);
	gulp.watch(path.src.img, images);
	gulp.watch(path.src.vcf, vcf);
	gulp.watch(path.src.data, html);
}

function clear() {
	return del('./build/');
}

const watch = gulp.series(watchAll, serverReload);
const build = gulp.parallel(html, css, js, images, vcf);
const buildAndStart = gulp.parallel(html, css, js, images, vcf, watch, server);
const clearAndBuild = gulp.series(clear, build);

exports.default = buildAndStart;
exports.build = build;
exports.clearAndBuild = clearAndBuild;
exports.watch = watch;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.vcf = vcf;
exports.clear = clear;
