import {createProxyMiddleware} from "http-proxy-middleware"

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://social-media-server-wbur.onrender.com',
      changeOrigin: true,
    })
  );
};
