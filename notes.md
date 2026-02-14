Implementation Plan
    File Collection

        Goal is to implement testing framework in any another project directory.
        Once we run "tme" in the terminal of that directory, our program should iterate through all files and collect the ones ending in test.js.

        Sub-Steps
            Find all files ending in '*test.js' recursively though a directory/folder.
            Store a reference to each file we find.
            After getting a full list of the test files, execute them one by one.

    Test Environment Set-Up

        Make sure that we can execute the test.js files.

    Test File Execution

        Run each 'it' statement in each test.js file, watching for errors.

    Report Results

        Tabulate data and print to terminal.

Data Structure: Some programming structure used to organise data within an application.

    Array: Organises in a list.

    Object: Collection of key-value pairs.

    Hash Map/Table: 

    Tree: Has a head (root?) element, which has some number of children folders. Those folders have their own children folders/files. To iterate through a tree, can use the following algorithms:

        Breadth First Search/Traversal
            1- Look at all children of parent and add to an array.
            2- For loop iterates through that array. For each item in that array, look at all of its children and add them to the same array.
            3- At the end, we have a gigantic array with every element in the tree. We can use this array to perform whatever functions needed in rest of program (ex: looking for files that end in 'test.js').

        Depth First Search/Traversal


