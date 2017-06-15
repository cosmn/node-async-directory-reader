'use strict';

const { sep : path_separator, resolve : path_resolve } = require('path');
const { readdir, lstat } = require('fs');

var adr = module.exports = function adr(dir, callback){

    const files = [], errors = []

    readdir( dir, function(err, paths){
        if(err) return callback([err]);

        const paths_count = paths.length
        let paths_processed = 0

        paths.forEach(function(file){

            let processing_path = path_resolve(dir + path_separator + file)

            lstat( processing_path, function(err, stat){
                if( err ){
                    errors.push(err)
                    paths_processed++
                    done(paths_count, paths_processed, errors, files, callback)
                }else if( stat && stat.isDirectory() ){
                    adr( processing_path, function(err, new_files){
                        paths_processed++
                        if(err && err.length > 0)
                            errors = errors.concat(err)
                        files = files.concat(new_files)
                        done(paths_count, paths_processed, errors, files, callback)
                    })
                }else{
                    paths_processed++
                    files.push(processing_path)
                    done(paths_count, paths_processed, errors, files, callback)
                }
            })
        })
    })
}

function done(total, processed, errors, files, callback){
    if( total != processed ) return;
    if( errors && errors.length > 0 ) return callback(errors, files)
    callback(null, files)
}
