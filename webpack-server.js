import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

export default port => {
    const server = new WebpackDevServer(webpack(config), {
        proxy: {
            '*': `http://localhost:${port - 1}`
        },
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
    }).listen(port, 'localhost', (err, result) => {
        if (err) {
            return console.log(err);
        }
    });
};