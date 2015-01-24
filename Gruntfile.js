// Generated on 2015-01-24 using
// generator-starterkit 1.3.1

'use strict';

module.exports = function (grunt) {

    // Time how long tasks take to execute
    require('time-grunt')(grunt);

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('assemble');

    // Initialize config.
    grunt.initConfig({

        // contains some project configuration properties
        pkg: require('./package.json'),

        // watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            sass: {
                files: ['<%= pkg.app %>/{assets,components,pages}/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer']
            },
            styles: {
                files: ['<%= pkg.app %>/assets/styles/{,*/}*.css'],
                tasks: ['copy:css', 'autoprefixer'] //, 'stripmq:server'
            },
            scripts : {
                files: ['<%= pkg.app %>/**/*.js'],
                tasks: ['jshint']
            },
            assemble: {
                files: ['<%= pkg.app %>/**/*.{hbs,json}'],
                tasks: ['assemble:server']
            }
        },

        // compile handlebars files into html
        assemble: {
            options: {
                flatten: true,
                data: ['<%= pkg.app %>/{pages,components,data}/**/*.json'],
                layout: 'default.hbs',
                layoutdir: '<%= pkg.app %>/layouts',
                // assets: 'dist/images',
                partials: ['<%= pkg.app %>/components/**/*.hbs']
            },
            dist: {
                files: {
                    '<%= pkg.dist %>': ['<%= pkg.app %>/pages/**/*.hbs']
                }
            },
            server: {
                files: {
                    '.tmp/': ['<%= pkg.app %>/pages/**/*.hbs']
                }
            }
        },

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= pkg.app %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%= pkg.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= pkg.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= pkg.dist %>/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= pkg.app %>/assets/scripts/{,*/}*.js',
                '<%= pkg.app %>/components/**/*.js',
                '<%= pkg.app %>/pages/**/*.js',
                '!<%= pkg.app %>/assets/scripts/vendor/*'
            ]
        },

        // Compile SASS to CSS
        sass: {
            options: {
                sourceMap: true
            },
            server: {
                files: {
                    '.tmp/assets/styles/main.css': '<%= pkg.app %>/assets/styles/main.{scss,sass}'
                }
            }
        },

        // Create a fallback media query-less legacy.css
        stripmq: {
            server: {
                options: {
                    width: 1024
                },
                files: {
                    '.tmp/assets/styles/legacy.css': ['.tmp/assets/styles/main.css']
                }
            },
            dist: {
                options: {
                    width: 1024
                },
                files: {
                    '<%= pkg.dist %>/assets/styles/legacy.css': ['<%= pkg.dist %>/assets/styles/main.css']
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                src: [
                    '<%= pkg.app %>/layouts/default.hbs',
                    '<%= pkg.app %>/assets/styles/main.scss'
                ],
            }
        },

        // configuration is automatically generated by usemin
        uglify: {
            options: {
                sourceMap: true,
                mangle: false
            }
        },

        // Rename files for cache busting
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= pkg.dist %>/assets/scripts/{,*/}*.js',
                        '<%= pkg.dist %>/pages/**/*.js',
                        '<%= pkg.dist %>/components/**/*.js',
                        '!<%= pkg.dist %>/assets/scripts/vendor/*',
                        '<%= pkg.dist %>/assets/styles/{,*/}*.css',
                        '<%= pkg.dist %>/assets/images/{,*/}*.*',
                        '<%= pkg.dist %>/assets/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= pkg.dist %>'
            },
            html: ['<%= pkg.dist %>/*.html']
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                dirs: ['<%= pkg.dist %>']
            },
            html: ['<%= pkg.dist %>/*.html'],
            css: ['<%= pkg.dist %>/assets/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.app %>/assets/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= pkg.dist %>/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.app %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= pkg.dist %>/assets/images'
                }]
            }
        },

        // The configuration for cssmin is automatically generated by usemin
        cssmin: {

        },

        // current unused, if desired, place at the end of the build task
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.app %>',
                    src: '*.html',
                    dest: '<%= pkg.dist %>'
                }]
            }
        },

        // configuration is automatically generatred by usemin
        concat: {
            dist: {}
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.app %>',
                    dest: '<%= pkg.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'assets/vendor/**/*',
                        'assets/styles/vendor/**/*',
                        'assets/scripts/vendor/**/*',
                        'assets/images/**/*',
                        'assets/styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            css: {
                expand: true,
                dot: true,
                cwd: '<%= pkg.app %>/assets/styles',
                dest: '.tmp/assets/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'sass',
                'copy:css',
                'assemble:server',
                'jshint'
            ],
            test: [
                'copy:css'
            ],
            dist: [
                'sass',
                'copy:css',
                'jshint',
                'assemble:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // zip up the build for deployment
        compress: {
            main: {
                options : {
                    archive : '<%= pkg.dist %>/<%= pkg.name %>.zip'
                },
                files : [
                    {
                        expand: true,
                        src : '**/*',
                        cwd : '<%= pkg.dist %>/'
                    }
                ]
            }
        },

        // Create an empty version.txt file for Jenkins to use
        exec: {
            version: {
                cwd : 'dist/',
                command: 'touch version.txt'
            },
            createDistDir: {
                command: 'mkdir -p dist'
            }
        },

        // Add notifications for errors, server and reload
        notify: {
            build: {
                options: {
                    message: 'build complete'
                }
            },
            server: {
                options: {
                    message: 'Server is ready!'
                }
            },
            watch: {
                options: {
                    message: 'Changes reloaded!'
                }
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            // 'stripmq:server',
            'connect:livereload',
            'notify:server',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test'
    ]);
    grunt.registerTask('build', [
        'clean:dist',
        'exec:createDistDir',
        'concurrent:dist',
        'autoprefixer',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        // 'stripmq:dist',
        'rev',
        'usemin',
        'exec:version',
        'notify:build'
    ]);
    grunt.registerTask('deploy', [
        'compress'
    ]);
    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
