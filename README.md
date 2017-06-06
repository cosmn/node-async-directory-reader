NodeJS Async Recursive Directory Reader
--------

NPM install
```bash
    npm install async-directory-reader --save
```

Usage
```javascript
const adr = require('async-directory-reader')

adr('path/to/directory', function(err, file_list){
	if (err) console.error(err)
	console.log('Array of files:', file_list)
})
```
