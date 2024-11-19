directory="/opt/lampp/htdocs/quickmart"

if [ -d "$directory" ]; then
    echo "Deleting: '$directory'"
    rm -r "/opt/lampp/htdocs/quickmart"
fi

echo "Copying: 'app', 'assets', 'config' and 'public' to '$directory'"

mkdir $directory

cp -R ./app $directory/app
cp -R ./assets $directory/assets
cp -R ./config $directory/config
cp -R ./public $directory/public
