const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `bundle-${getFormattedDateTime()}-[chunkhash].js`,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: { '@': path.join(__dirname, 'src') }
  },
  plugins: [new CleanWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: 'public',
        to: 'public',
      }
    ]
  })
  ],
}

// Helper function to get formatted datetime
function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[now.getMonth()]; // Get month as three-character abbreviation
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
}