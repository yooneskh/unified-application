ssh $zxc pm2 start --name project-backend --cwd /home/yooneskh/project/backend/ deno -- task start
ssh $zxc PORT=8082 pm2 start --name project-frontend --cwd /home/yooneskh/project/frontend/ deno -- task start
