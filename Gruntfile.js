module.exports = function(grunt) {
    
    let config = require('./.screeps.json')

    let branch = grunt.option('branch') || config.branch;
    let email = grunt.option('email') || config.email;
    let password = grunt.option('password') || config.password;
    let ptr = grunt.option('ptr') || config.ptr;
    
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-file-append');

    let currentDate = new Date();

    grunt.log.subhead(`Task Start: ${currentDate.toLocaleString()}`);
    grunt.log.writeln(`Branch: ${branch}`);

    grunt.initConfig({
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist'],
        },

        // Copy all source files into the dist folder, flattening the folder structure
        copy: {
            // Pushes the game code to the dist folder so it can be modified before being sent to the screeps server
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        return dest + src.replace(/\//g, '_');
                    },
                }],
            }
        },

        file_append: {
            versioning: {
                files: [
                    {
                        append: `\nglobal.SCRIPT_VERSION =${currentDate.getTime()}\n`,
                        input: 'dist/version.js',
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['clean','copy:screeps', 'file_append:versioning','screeps']);
}