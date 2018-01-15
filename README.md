# mongo-skeleton
A basic node/express/mongo/mongoose skeleton for reference


## To Run:
	Clone repo
	npm install
	You must have a local mongodb server running on 27017

## Generator Installation:
Out of the box, there are quite a few things they don't tell you. Express-generator runs fine with JADE and defaults, but when you want to add a CSS processor or other, it might rely on outher build libraries. For this reason we need to install the "windows-build-tools" NPM module so that we have python and Visual C++ available. 

Steps to (really) set up node to be able to generate express scripts:

    Install node js.
    npm install express -g
    npm install express-generator -g
    npm install windows-build-tools -g (Must be run in administrator prompt)
    express --view=hbs --git --css=sass <directory>
	
This creates an express app with Handlebars.js and SASS support

	npm install mongo --save
	npm install mongoose --save
	
This configures your mongo/mongoose modules.

    
