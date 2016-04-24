const gulp = require('gulp')
const liveServer = require('gulp-live-server')
const browserSync = require('browser-sync')

gulp.task('live-server', function() {
    const server = new liveServer('main.js')
    server.start()
})

gulp.task('serve', ['live-server'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8000",
        port: 9001
    })
})
