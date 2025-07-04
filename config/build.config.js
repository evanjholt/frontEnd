// Build configuration for Quiver Quantitative frontend
const path = require('path');
const fs = require('fs');

const config = {
    // Source directories
    srcDir: path.resolve(__dirname, '../src'),
    distDir: path.resolve(__dirname, '../dist'),
    publicDir: path.resolve(__dirname, '../public'),
    
    // Asset directories
    assetsDir: path.resolve(__dirname, '../assets'),
    imagesDir: path.resolve(__dirname, '../assets/images'),
    fontsDir: path.resolve(__dirname, '../assets/fonts'),
    
    // Pages directory
    pagesDir: path.resolve(__dirname, '../pages'),
    
    // CSS configuration
    css: {
        srcDir: path.resolve(__dirname, '../src/styles'),
        entry: path.resolve(__dirname, '../src/styles/main.css'),
        output: 'styles/main.css'
    },
    
    // JavaScript configuration
    js: {
        srcDir: path.resolve(__dirname, '../src/scripts'),
        entry: path.resolve(__dirname, '../src/scripts/main.js'),
        output: 'scripts/main.js'
    },
    
    // Component configuration
    components: {
        srcDir: path.resolve(__dirname, '../src/components'),
        header: path.resolve(__dirname, '../src/components/header.html'),
        footer: path.resolve(__dirname, '../src/components/footer.html')
    },
    
    // Development server configuration
    devServer: {
        port: 3000,
        host: 'localhost',
        open: true,
        hot: true,
        static: {
            directory: path.resolve(__dirname, '..'),
            publicPath: '/'
        }
    },
    
    // Build optimization
    optimization: {
        minify: process.env.NODE_ENV === 'production',
        sourceMaps: process.env.NODE_ENV !== 'production',
        cssMinify: process.env.NODE_ENV === 'production',
        jsMinify: process.env.NODE_ENV === 'production'
    },
    
    // File patterns
    patterns: {
        html: '**/*.html',
        css: '**/*.css',
        js: '**/*.js',
        images: '**/*.{png,jpg,jpeg,gif,svg,webp}',
        fonts: '**/*.{woff,woff2,ttf,eot}'
    },
    
    // Build tasks
    tasks: {
        clean: {
            patterns: ['dist/**/*']
        },
        copy: {
            assets: {
                from: 'assets/**/*',
                to: 'dist/assets/'
            },
            components: {
                from: 'src/components/**/*',
                to: 'dist/components/'
            },
            pages: {
                from: 'pages/**/*',
                to: 'dist/pages/'
            }
        },
        process: {
            css: {
                from: 'src/styles/main.css',
                to: 'dist/styles/main.css',
                plugins: ['autoprefixer', 'cssnano']
            },
            js: {
                from: 'src/scripts/main.js',
                to: 'dist/scripts/main.js',
                plugins: ['babel', 'terser']
            }
        }
    }
};

module.exports = config;