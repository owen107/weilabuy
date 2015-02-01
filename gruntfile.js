module.exports = function(grunt) {
   
   // configure tasks
   grunt.initConfig({
   	  pkg: grunt.file.readJSON('package.json'),
   	  uglify: {
   	  	build: {
   	  	  files: {
	        'builds/development/js/script.js': ['components/js/*.js', 'components/js/lib/**/*.js']
	      }
   	  	},
   	  	dev: {
   	  	  options: {
   	  	  	beautify: true,
   	  	  	mangle: false,
   	  	  	compress: false,
   	  	  	preserveComments: 'all'
   	  	  },
   	  	  files: {
	        'builds/development/js/script.js': ['components/js/*.js', 'components/js/lib/**/*.js']
	      }
   	  	}
   	  },
   	  watch: {
   	  	options: {
   	  		livereload: true
   	  	},
   	  	js: {
           files: ['components/js/*.js'],
           tasks: ['uglify:dev']
   	  	},
   	  	css: {
           files: ['builds/development/css/*.css']
   	  	},
   	  	html: {
           files: ['builds/development/*.html']
   	  	}
   	  }
   });
   
   // Load the plugins
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');

   // Register tasks
   grunt.registerTask('default', ['watch']);
   grunt.registerTask('build', ['uglify:build']);

};