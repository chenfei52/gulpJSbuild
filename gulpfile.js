const gulp = require('gulp');
const uglify = require("gulp-uglify");
const htmlminify = require('gulp-html-minify');
const imagemin = require('gulp-imagemin');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const scss = require('gulp-sass');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const pump = require('pump');
const webpack = require('webpack-stream');
const path = require("path");
const through = require("through2");

gulp.task('clean', function (cb) {
    pump([
        gulp.src('./dist/*'),
        clean()
    ], cb)
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(webpack({
            devtool: 'source-map',
            entry: {
                index: ['babel-polyfill', "./src/js/index.js"]
            },
            output: {
                path: path.resolve(__dirname, "./dist/js"),
                filename: "[name].js"
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env'],
                                    plugins: ["@babel/transform-runtime"]
                                }
                            }
                        ]
                    }]
            },
        }))
        // .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./dist/js'))

});

gulp.task('scss', function () {
    return gulp.src('src/css/*.scss')
        .pipe(scss())
        .pipe(prefixer({
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(modify('.scss', '.css'))
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist'))

});

gulp.task('html1', function () {
    return gulp.src('src/html/*.html')
        .pipe(modify('.scss', '.css'))
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist/html'))
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*.{jpg,png,gif,ico,svg}')
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('copy', function () {
    return gulp.src('plugins/**/*')
        .pipe(gulp.dest('dist/plugins/'))
});

gulp.task('watch', callback => {
    watch('src/index.html', gulp.series('html'));
    watch('src/html/*.html', gulp.series('html1'));
    watch('src/**/*.scss', gulp.series('scss'));
    watch('src/**/*.js', gulp.series('js'));
    watch('src/**/*.{jpg,png,gif,ico,svg}', gulp.series('img'));
    watch('dist/**/*', browserSync.reload);
});

gulp.task('browserSync', () =>
    browserSync.init({
        port: 8088,
        server: {baseDir: "dist"},
        reloadOnRestart: false,
        notify: false,
        timestamps: false,
    })
);

//替换文件内容
function modifyStreamContent(modify) {
    return through.obj(function(file, endcoding, callback) {
        if(file.isNull()) {
            this.push(file);
            return callback()
        }
        if(file.isStream()) {
            log("streaming not supported", "error");
            return callback()
        }
        let content = file.contents.toString();
        content = modify(content, file.path) || content;
        file.contents = new Buffer(content);
        this.push(file);
        callback()
    })
}
function modify(str1, str2) {
    return modifyStreamContent((content, filePath) => {
        content = content.replace(str1, str2);
        return content;
    })
}

gulp.task('build', gulp.series([
    'clean',
    'js',
    'scss',
    'html',
    'html1',
    'img',
    'copy'
]));

gulp.task('default', gulp.series(['build'], async () => {
    await console.info('压缩完成');
}));

gulp.task('server', gulp.series('build', gulp.parallel('browserSync', 'watch')));
