  var express  = require( 'express' ),
  bp       = require('body-parser'),
  path     = require( 'path' ),
  root     = __dirname,
  port     = process.env.PORT || 8000,
  app      = express();
  // routes   = require("./server/config/routes.js")(app);

app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.use( express.static( path.join( root, 'client' )));
app.use(express.static(path.join(__dirname, './client/assets')));
app.set('views', path.join(__dirname, './client/partials'));

app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json())


require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
