class ReplaceImports {
    
    constructor(grunt) {
        this.grunt = grunt;
    }

    runReplace(abspath, rootdir, subdir, filename) {

        this.subdir = subdir;

        if(!this._isJsFile(abspath)){
            return;
        }

        let lines = this._getFileAsArray(abspath);
        let newFile = '';
        for (let line of lines) {
            newFile += this._processLine(line) + '\n';
        }

        this.grunt.file.write(abspath, newFile);
    
    }

    _isJsFile(abspath) {
        return abspath.match(/.js$/) != null;
    }

    _getFileAsArray(abspath) {
        let file = this.grunt.file.read(abspath);
        return file.split('\n');
    }

    _processLine(line) {

        if (this._manuallyIgnoredLine(line)) {
            return line;
        }

        if (! this._requireFound(line) ) {
            return line;
        }

        return line.replace(/(require\([\'\"])([\.\/]*)(.*?)([\'\"].*)/, "$1$3$4").replace(/\//gi, '_');

    }

    _manuallyIgnoredLine(line) {
        return line.match(/[.]*\/\/ Compiler: IgnoreLine[.]*/) != null;
    }

    _requireFound(line) {
        return this._getRequirePath(line) != null;
    }

    _getRequirePath(line) {
        return line.match(/(?:require\([\'\"])([^_a-zA-Z0-9]*)([^\"\']*)/);
    }

}

module.exports=ReplaceImports;