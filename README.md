# sydjs.com
## The VegsocHK Website.
## Getting Started
To run the VegsocHK site locally, there are a few things to set up.

Because we have some private keys for our MongoDB, Cloudinary and Mandrill accounts, you'll need to set up your own equivalents before the site will run properly.

### Install Node.js and MongoDB
You'll need node 0.10.x and npm 1.3.x installed to run VegsocHK. The easiest way is to download the installers from [nodejs.org](http://nodejs.org).

You'll also need MongoDB 2.4.x - if you're on a Mac, the easiest way is to install [homebrew](http://brew.sh) and then run `brew install mongo`.

If you're on a Mac you'll also need Xcode and the Command Line Tools installed or the build process won't work.

### Setting up your copy of VegsocHK
Get a local copy of the site by cloning this repository, or fork it to work on your own copy.

Then run `npm install` to download the dependencies.

Before you continue, create a file called `.env` in the root folder of the project (this will be ignored by git). This file is used to emulate the environment config of our production server, in development. Any `key=value` settings you put in there (one on each line) will be set as environment variables in `process.env`.

The only line you **need** to add to your `.env` file is a valid `CLOUDINARY_URL`. To get one of these, sign up for a free account at [Cloudinary](http://cloudinary.com) and paste the environment variable if gives you into your `.env` file. It should look something like this:

```
CLOUDINARY_URL=cloudinary://12345:abcde@cloudname
```

### Running VegsocHK
Once you've set up your configuration, run `node keystone` to start the server.

By default, [Keystone](http://keystonejs.com) will connect to a new local MongoDB database on your localhost called `sydjs`, and create a new Admin user that you can use to log in with using the email address `user@keystonejs.com` and the password `admin`.

If you want to run against a different server or database, add a line to your `.env` file to set the `MONGO_URI` environment variable, and restart the site.

When it's all up and running, you should see the message `VegsocHK is ready on port 3000` and you'll be able to browse the site on [localhost:3000](http://localhost:3000).

### Facebook login
Add `FACEBOOK_API=X.x` in your .env file. For Facebook API >= 2.4 you must specify the fields you want to get in user profile.

### Here be ~~dragons~~ errors
#### or, how you don't have any content yet
The first time you run the site, the homepage will warn you that it expects there to be at least one meetup, and your database won't have any. Don't freak out, just go to [/keystone](http://localhost:3000/keystone), sign in as the admin user, and create one.

You'll probably want to add some other content too (blog post, members, etc) to get all the pages looking right.

... happy hacking!

### Deploy
# Server Nginx setup
Create a digital ocean droplet got the new IP in digital ocean web console, e.g. 128.199.244.233

```
ssh root@128.199.244.233
apt-get update; apt-get upgrade
apt-get install build-essential libssl-dev

apt-get -y install nginx
service nginx start
mkdir -p /var/www
sudo chown root:git -R /var/www
sudo chmod 775 /var/www

rm /etc/nginx/sites-enabled/default
cd /etc/nginx/sites-available
vi vegsochk.org

server {
        listen 80;

        server_name vegsochk.org;

        access_log /var/log/nginx/vegsochk_access.log;
        error_log /var/log/nginx/vegsochk_error.log;

        root /var/www/vegsochk.org/public;

        location ~ ^/keystone/(.+\.(?:jpg|jpeg|svg|eot|html|woff|woff2|ttf|png|gif|ico|css|js))$ {
                alias /var/www/vegsochk.org/node_modules/keystone/admin/public/$1;
                expires 30d;
                access_log off;
        }

        location ~*  \.(jpg|jpeg|svg|eot|html|woff|woff2|ttf|png|gif|ico|css)$ {
                expires 30d;
                access_log off;
        }

        location ~*  /lib/\.(js)$ {
                expires 30d;
                access_log off;
        }

        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://127.0.0.1:3000/;
                proxy_redirect off;
        }
}

cd /etc/nginx/sites-enabled
ln -s ../sites-available/vegsochk.org

service nginx reload
```

# Server git deploy setup

```
apt-get -y install git
groupadd git
visudo
git ALL=(ALL) NOPASSWD: ALL

mkdir -p /home/git/.ssh
touch /home/git/.ssh/authorized_keys
chmod 600 /home/git/.ssh/authorized_keys
useradd -g git -G www-data -d /home/git -s /bin/bash git
chown -R git:git /home/git
```

# Server Nodejs setup

```
npm install -g forever
```

Login as git and configure the git folders

```
su - git
echo 'export PATH=$PATH:/usr/sbin' > .profile
mkdir -p /home/git/tmp/vegsoc-hk
mkdir -p /home/git/repos/vegsoc-hk.git
cd /home/git/repos/vegsoc-hk.git
git init --bare
cd hooks
touch post-receive
vi post-receive
```

Update the post-receive file to the following

```
#!/bin/bash -l
GIT_REPO=$HOME/repos/vegsoc-hk.git
TMP_GIT_CLONE=$HOME/tmp/vegsoc-hk
PUBLIC_WWW=/var/www/vegsochk.org

git clone $GIT_REPO $TMP_GIT_CLONE
cd $TMP_GIT_CLONE
npm install

forever stop vegsochk
rsync -rv --exclude=.git $TMP_GIT_CLONE/ $PUBLIC_WWW
rm -Rf $TMP_GIT_CLONE
cd $PUBLIC_WWW
cp /var/www/shared/vegsoc-hk/.env $PUBLIC_WWW/.env
forever start -a -o logfile.out -e logerror.out --uid "vegsochk" keystone.js
exit
```

Change the post-receive execution

```
chmod +x post-receive
```

add developer id_rsa.pub for future git push deployment:

```
vi /home/git/.ssh/authorized_keys
```

Local Machine

```
git remote add staging git@128.199.244.233:repos/vegsoc-hk.git
git push staging master
```

# Update GoDaddy DNS record
   editor-staging A 128.199.244.233
