git pull origin main
# npm run build (Skipped due to low server RAM - building locally instead)
sudo cp -r build/. /var/www/fcpoprad.info/html/
sudo chown -R www-data:www-data /var/www/fcpoprad.info/html/
