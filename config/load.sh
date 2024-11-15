directory="/opt/lampp/htdocs/quickmart"

if [ -d "$directory" ]; then
    echo "Deleting: '$directory'"
    rm -r "/opt/lampp/htdocs/quickmart"
fi
echo "Copying: '.' to '$directory'"
cp -R . $directory
