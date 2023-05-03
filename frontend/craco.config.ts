import path from 'path';

module.exports = {
  webpack: {
    alias: {
      '~/components': path.resolve(__dirname, 'src/components'),
      '~/constants': path.resolve(__dirname, 'src/constants'),
      '~/hooks': path.resolve(__dirname, 'src/hooks'),
      '~/theme': path.resolve(__dirname, 'src/theme'),
      '~/types': path.resolve(__dirname, 'src/types'),
      '~/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};
