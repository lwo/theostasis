let cookieParser = require('cookie-parser');
let createError = require('http-errors');
let express = require('express');
let fs = require('fs');
let logger = require('morgan');
// let nconf = require('nconf');
let path = require('path');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
//

// default index router
const staticRouter = express.Router();
staticRouter.get('/', function (req, res, next) {
    res.render('index');
    next();
});
app.use('/', staticRouter);

// This is a convenient way of adding static routers for views that have no custom router (as defined in routes).
// The path of the view is parallel to a custom router. If not found, a static router is used.
// The name of the view file is 'index.pug'
//
['views'].forEach(function (folder) {
    let walk = function (directoryName, query_path) {
        fs.readdir(directoryName, function (e, files) {
            if (e) {
                console.log('Error: ', e);
                return;
            }
            files.forEach(function (file) {
                var fullPath = path.join(directoryName, file);

                fs.stat(fullPath, function (e, f) {
                    if (e) {
                        console.log('Error: ', e);
                        return;
                    }
                    if (f.isDirectory()) {
                        walk(fullPath, path.join(query_path, path.basename(fullPath)));
                    } else {
                        let view = path.basename(fullPath, '.pug');
                        if (view === 'index') {
                            let base_route = path.dirname(fullPath.replace('/' + folder + '/', '/routes/'));
                            let file = path.join(base_route, view) + '.js';
                            if (fs.existsSync(file)) {
                                console.info('Loading custom router ' + query_path + ' to ' + file);
                                let router = require(file);
                                app.use(query_path, router);
                            } else {
                                console.info('Adding to static router ' + query_path);
                                staticRouter.get(query_path, function (req, res) {
                                    let paths = query_path.substring(1);
                                    res.render(path.join(paths, 'index'), {query_path:query_path} );
                                });
                            }
                        }
                    }
                });
            });
        });
    };
    walk(path.join(__dirname, folder), '/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
    console.log(req);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('NODE_ENV') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});

module.exports = app;
