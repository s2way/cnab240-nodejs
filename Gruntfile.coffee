module.exports = (grunt) ->

    config =
        pkg: grunt.file.readJSON 'package.json'
        coffeelint:
            app: ['cnab/src/*.coffee', 'cnab/test/*.coffee']
            options:
                configFile: 'coffeelint.json'
        mochaTest:
            progress:
                options:
                    reporter: 'progress'
                    require: ['coffee-script/register', 'blanket']
                    captureFile: 'mochaTest.log'
                    quiet: false,
                    clearRequireCache: false
                src: ['cnab/test/*.coffee']
            spec:
                options:
                    reporter: 'spec'
                    require: ['coffee-script/register', 'blanket']
                    captureFile: 'mochaTest.log'
                    quiet: false,
                    clearRequireCache: false
                src: ['cnab/test/*.coffee']
        exec:
            cov: "
                rm -rf cov;
                mkdir -p cov;
                ./node_modules/.bin/coffee --compile --output cov cnab;
                ./node_modules/mocha/bin/mocha cov/test -r blanket --reporter mocha-cov-reporter --compilers coffee:coffee-script/register --recursive;
                ./node_modules/mocha/bin/mocha cov/test -r blanket --reporter html-cov --compilers coffee:coffee-script/register --recursive > coverage.html"
        watch:
            src:
                files: ['**/**/*.coffee']
                tasks: ['lint', 'test', 'coverage']
            gruntfile:
                files: ['Gruntfile.coffee']

    grunt.initConfig config

    require('load-grunt-tasks')(grunt)

    grunt.registerTask 'default', 'Default', ->
        grunt.task.run 'lint'
        grunt.task.run 'test'
        # grunt.task.run 'compile'
        grunt.task.run 'coverage'
    grunt.registerTask 'lint', ['coffeelint']
    grunt.registerTask 'test', ['mochaTest:progress']
    grunt.registerTask 'coverage', ['exec:cov']
