module.exports = function(grunt) {

 grunt.initConfig({
  uglify: {
    options: {

    },
  build: {
      src: ['../lib/bower_components/jquery/dist/jquery.min.js',
            '../lib/bower_components/angular/angular.min.js',
            '../lib/bower_components/angular-bootstrap/ui-bootstrap.min.js',
            '../lib/bower_components/angular-route/angular-route.js',
            '../lib/bower_components/bootstrap/dist/js/bootstrap.min.js',
            '../lib/bower_components/datejs/build/production/date.min.js',
            '../lib/bower_components/firebase/firebase.js',
            '../lib/bower_components/angularfire/dist/angularfire.min.js'],
      dest: 'dependencies.min.js'
    }
  },
   jshint: {
     files: ['../app/**/*.js']
   },
   sass: {
     dist: {
       files: {
         '../styles/main.css': '../sass/main.scss'
       }
     }
   },
   watch: {
     javascripts: {
       files: ['../app/**/*.js'],
       tasks: ['jshint']
     },
   sassy: {
       files: ['../sass/**/*.scss'],
       tasks: ['sass']
   }
  }
 });

 require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 grunt.registerTask('default', ['jshint', 'sass', 'watch', 'uglify']);
};


