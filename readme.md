# Small Profiles for Business Cards

## Description

Based on Gulp, this bundle generates small online business cards with a person's name & contacts.

## Usage

1. Edit `/src/data.json` to add a person (* mandatory fields).


		* "url": "e",
		* "photo": "eric-cartman.jpg",
		* "name": "Eric Cartman",
		* "position": "Director",
		* "email": "eric@cartman.com",
		* "phone": "+18002522366",
		  "whatsapp": "18002522366",
		  "vcf": "Eric-Cartman.vcf",
		  "site": "",
		  "fb": "ecartman",
		  "vk": "",
		  "linkedin": "FatEric",
		* "color": "blue",
		  "analytics": ""


`url` - unique name for a publis profile url `https://cartman238432874.com/%url%/`;  
`photo` - image file name with an extension;  
`phone` - phone number without +, -, () and spaces;  
`whatsapp` - phone number without +, -, () and spaces associated with Whatsapp if you want to show "send me a message" item;  
`vcf` - vCard file name with an extension if you want to show "add me to contacts" 
item;  
`site` - site name without *http://*  
`fb, vk, linkedin` - username on a social network without a full url. Any other network, i.e. *Behance*, *Dribble* or anything else may be added if needed.  
`color` - background theme based on corporate colors, current options are: `green, blue, orange, gray`, any other color may be also added.  
Optional fields won't be rendered if left empty.

2. Add a person's photo & vcf file (if any) to `src/assets/cards/%url%`


3. Build: `gulp build` or start a local browsersync server with `gulp`


4. Upload a compiled new person's folder from `/build/` to the domain's root.

Developed in March, 2019

![demo](https://github.com/eternalduck/prtfl-business-cards/blob/master/src/assets/demo.jpg)
