const fs = require('fs')
const yargs = require('yargs')
const _ = require('lodash')
// Create add command
yargs.command({
    command: 'writefile',
    describe: 'fswrite using yargs',
    builder: {
        filename: {
            describe: 'File Name',
            demandOption: true,  // Required
            type: 'string'     
        },
    },
  
    // Function for your command
    handler(argv) {
        console.log("File Name Entered:",(argv.filename))
        let filenameexist = 'false'
        //write logic to check if the file name is duplicate and already entered
        try{
            const data = fs.readFileSync('filenames.txt')
            let filenamearray = data.toString().split('|')
                console.log('FileNameArray:'+filenamearray)
                for(var i=0; i < filenamearray.length;i++){
                    if(filenamearray[i] == argv.filename)
                    {
                        filenameexist = 'true'
                    }
                }

        } 
        catch (err)
        {
            console.log(err)
        }

        console.log('filenameexist:' + filenameexist)
        if(filenameexist !== 'true')
        {
            //file name is new
            //capture the file name in filenames.txt
            fs.appendFile('filenames.txt','|'+argv.filename,function(err){
                if(err)
                    console.log(err)
                else
                    console.log('File Name captured successfully')
            })
            //create a new file with that file name
            fs.writeFile(argv.filename+".txt", 'You are awesome',function(err){
                if(err)
                    console.log(err)
                else
                    console.log('Data written to new file successfully')
            })
        }
        else
        {
            console.log("Filename exists. Please run program again and enter different name to proceed.")
        }
    }
})

yargs.parse()