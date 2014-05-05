module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    connect: {
      server: {
        options: {
          open: 'http://0.0.0.0:8080/develop.html',
          port: 8080,
          livereload: 35729
        }
      }
    },
    watch: {
      dev: {
        files: ['**/*', '!node_modules/**', '!lib/**'],
        options: {
          livereload: true
        }
      },
      rebuild: {
        files: ['**/*', '!node_modules/**', '!lib/**'],
        tasks: ['default'],
        options: {
          livereload: true
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'index.html': ['develop.html']
        }
      }
    },
    clean: {
      previous: ['dist', '.tmp']
    },
    useminPrepare: {
      html: 'develop.html',
      options: {
        assetsDirs: 'dist'
      }
    },
    usemin:{
      html:['index.html']
    },
    copy:{
      html: {
        src: './develop.html', dest: './index.html'
      },
      partials: {
        src: './partials/*.html', dest: 'dist/'
      }
    }
  });

  grunt.registerTask('default', [
    'clean:previous',
    'processhtml',
    'copy:partials',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin'
  ]);
};