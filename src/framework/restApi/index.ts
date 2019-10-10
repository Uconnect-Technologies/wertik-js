export default function (app,configuration) {
    
    app.get('/', (req, res) => {
        res.json({
            message: 'Welcome to wertik, You have successfully running Wertik rest api!'
        });
    });

    app.listen(5000, () => {
      console.log('Api server running at 5000!');
    });
    
}