class ScreepsConfig {

    constructor(grunt) {
        this.grunt = grunt;
    }

    init() {

        
        this.grunt.initConfig({
            screeps_public: this.configurePublicGruntScreeps(),
            screeps_private: this.configurePrivateGruntScreeps(),
            clean: this.configureGruntContribClean(),
            copy: this.configureGruntContribCopy(),
            file_append: this.configureGruntFileAppend()
        });

        this.configureGruntReplace();

        this.grunt.registerTask('default', ['clean','copy:screeps','file_append:versioning','replace','screeps_private']);
        this.grunt.registerTask('default', ['clean','copy:screeps','file_append:versioning','replace','screeps_public']);

    }

    configureGruntReplace() {

        let ReplaceImports = require('./tools/ReplaceImports');
        let replace = new ReplaceImports(this.grunt);

        this.grunt.registerTask('replace', 'Replaces file paths with _', () => this.grunt.file.recurse('./dist', (abspath, rootdir, subdir, filename) => replace.runReplace(abspath, rootdir, subdir, filename) ) );

    }
    
    configureGruntFileAppend() {
        this.grunt.loadNpmTasks('grunt-file-append');

        let currentDate = new Date();

        return {
            versioning: {
                files: [
                    {
                        append: `\nglobal.SCRIPT_VERSION =${currentDate.getTime()}\n`,
                        input: 'dist/version.js',
                    }
                ]
            }
        };
    }

    configureGruntContribClean() {
        this.grunt.loadNpmTasks('grunt-contrib-clean');
        return {
            'dist': ['dist'],
        };
    }

    configurePrivateGruntScreeps() {
        
        this.grunt.loadNpmTasks('grunt-screeps');

        let config = require('./.screeps.json')

        return {
            options: {
                server: {
                    host: config.private.server.host,
                    port: config.private.server.port,
                    http: config.private.server.http,
                },
                email: config.private.email,
                password: config.private.password,
                branch: config.private.branch,
                ptr: config.private.ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        };

    }

    configurePublicGruntScreeps() {
        
        this.grunt.loadNpmTasks('grunt-screeps');

        let config = require('./.screeps.json')

        return {
            options: {
                email: config.public.email,
                password: config.public.password,
                branch: config.public.branch,
                ptr: config.public.ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        };

    }

    configureGruntContribCopy() {
        this.grunt.loadNpmTasks('grunt-contrib-copy');

        return {
            screeps: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**',
                        dest: 'dist/',
                        filter: 'isFile',
                        rename: function (dest, src) {
                            // Change the path name utilize underscores for folders
                            return dest + src.replace(/\//g,'_');
                        }
                    }
                ],
            }
        };
    }

}

module.exports = function(grunt) {
    
    let config = new ScreepsConfig(grunt);
    let currentDate = new Date();
    
    grunt.log.subhead(`Task Start: ${currentDate.toLocaleString()}`);

    config.init();

}