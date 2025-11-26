const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'data:', 'https:'],
      'script-src': ["'self'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'font-src': ["'self'", 'https:', 'data:']
    }
  }
}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  index: 'index.html',
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
}));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Alliance Groups marketing site listening on port ${port}`);
});
