# Linkcast
> A chrome extension to share links!

Linkcast is a chrome extension which organises your links and facilitates sharing. It allows you to create groups (public/private) and post relevant links in relevant groups. Other users can collaborate by joining those groups depending on the type of the group and the permission. 

## How is it different from bookmarks ?
Bookmarks doesnt allow you to collaborate and neither does it allow you to express. With Linkcast you get all the features of bookmarks and also can comment on links. You receive notifications on new links, comments, likes, etc. 

## Base
Linkcast is minimal in size has been developed using [Hyperapp](https://github.com/hyperapp/hyperapp) which is a ~1kb library.

## ToDo's
Linkcast is reaching a state of stability. There needs to be more refinement and the experience needs to be more personalised.

## Install
Clone the project
#### ` git clone git@github.com:ajaxtown/linkcast.git` 

Step inside the directory
#### ` cd linkcast`

Install all packages/dependencies
#### ` npm install`

Run
#### ` npm run dev`

Navigate to `chrome://extensions/`

Click `Load Unpacked Extensions` and add the `dev` directory

## Test Users
| Username      | Password  | Email                     |
| ------------- | --------- | --------------------------|
| Captain       | linkcast  | captain@linkcast.com      |
| Nevermore     | linkcast  | nevermore@linkcast.com    |
| ScarFace      | linkcast  | scarface@linkcast.com     |
| Troll         | linkcast  | troll@linkcast.com        |
| FunnyFace     | linkcast  | funnyface@linkcast.com    |
| Thriller      | linkcast  | thriller@linkcast.com     |
| MaskOfMadness | linkcast  | maskofmadness@linkcast.com|
| GodOfDevil    | linkcast  | godofdevil@linkcast.com   |

## Screenshots


## Contribute
If you have any ideas or would like to contribute, feel free to send PR's or create issues or ask for feature requests. Below is the structure of Linkcast.

`dev` - Main development directory
`dev/js` - Main files of linkcast
`dev/public` - Contains css, fonts, icons and images

`dev/js/popup.js` is the main file. Everything starts here.

## Thanks
##### `@fleshsword Todd Cantley` - For designs
##### `@farokojil Farok` - for ideas and filing bugs
##### `@bi6o Bitar` - for ideas and filing bugs and PR's