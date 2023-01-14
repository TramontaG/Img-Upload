import express from 'express';
import imgUpload from './Router/upload';
import imgGetter from './Router/retrieve';

const App = express();

App.use('/', imgUpload);
App.use('/', imgGetter);

App.listen(9889);
