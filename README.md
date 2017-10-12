# Linkcast

Linkcast is a chrome extension which organises your links facilitates sharing. Few of the features are:
- Mark a link as favourite
- Post a link in a group and all users in that group get notified.
- Create a public or private group
- Like a particular post and also add comments
- As an admin, you will have full control of users and thier permissions

## History
Linkcast was developed with the intention of keeping all music tracks that my friends would share in one place. Then gradually, felt the need 
of having comments. To make it a bit more interactive, the like button was added along with comments.

## ToDo's
There are couple of things that needs to be done. Linkcast doesnt use any framework, still the code is modular. But I would like to add a tiny 
framework around, write some tests, create some themes, etc. Create a mysql staging server

## Install
Clone the project
` git clone git@github.com:ajaxtown/linkcast.git` 

Step inside the directory
` cd linkcast`

Install all packages/dependencies
`npm install`

Run
`npm run dev`

Navigate to `chrome://extensions/`

Click `Load Unpacked Extensions` and add the `dev` directory

## Contribute
If you have any ideas or would like to contribute, feel free to send PR's or create issues or ask for feature requests. Below is the structure of Linkcast.

`dev` - Main development directory
`dev/js` - Main files of linkcast
`dev/public` - Contains css, fonts, icons and images

`dev/js/popup.js` is the main file. Everything starts here.

## Thanks
Thanks for contributing folks:
@fleshsword Todd Cantley - For designs
@farokojil Farok - for ideas and filing bugs
@bi6o Bitar - for ideas a filing bugs and patience to listen