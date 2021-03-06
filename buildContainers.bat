echo off
set TAG=%1

echo "using tag: %TAG%"

call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=catalog -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=deals -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=loyalty -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=payment -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=recommendations -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=wishlist -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=customer -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=orders -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=ratings -PSERVICE_TAG=%TAG%
call gradle buildContainer -PSERVICE_REPO=nirmata -PSERVICE_NAME=shopui -PSERVICE_TAG=%TAG%
